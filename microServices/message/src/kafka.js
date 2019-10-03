const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  brokers: ["localhost:9090"],
  clientId: "message"
});

const consumer = kafka.consumer({ groupId: "certificate-group" });
const producer = kafka.producer();

module.exports = { consumer, producer };
