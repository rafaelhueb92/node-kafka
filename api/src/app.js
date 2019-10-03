const express = require("express");
const { producer, consumer } = require("../../layers/kafka")(
  "api",
  ["localhost:9090"],
  null,
  {
    initialRetryTime: 300,
    retries: 10
  },
  "certificate-group-receiver"
);
class App {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.startKafka();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use((req, res, next) => {
      req.producer = producer;
      return next();
    });
  }

  routes() {
    this.express.use(require("./routes"));
  }

  startKafka() {
    producer.connect();
    consumer
      .connect()
      .then(() => consumer.subscribe({ topic: "message-response" }))
      .then(() =>
        consumer.run({
          eachMessage: async ({ topic, partition, message }) => {
            console.log(topic, partition);
            console.log("Resposta", String(message.value));
          }
        })
      );
  }
}

module.exports = new App().express;
