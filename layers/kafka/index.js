const { Kafka, logLevel } = require("kafkajs");

module.exports = (clientId, brokers, logLevel, retry, groupId) => {
  const client = new Kafka({
    clientId,
    brokers,
    retry
  });

  return {
    producer: client.producer(),
    consumer: client.consumer({ groupId })
  };
};
