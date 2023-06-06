import { Kafka } from "@upstash/kafka";
import dotenv from 'dotenv';

const ENV = dotenv.config().parsed;
const { UPSTASH_KAFKA_REST_URL, UPSTASH_KAFKA_REST_USERNAME, UPSTASH_KAFKA_REST_PASSWORD } = ENV;

const kafka = new Kafka({
  url: UPSTASH_KAFKA_REST_URL,
  username: UPSTASH_KAFKA_REST_USERNAME,
  password: UPSTASH_KAFKA_REST_PASSWORD,
});

const c = kafka.consumer();

while (true) {
  const messages = await c.consume({
    consumerGroupId: "group_1",
    instanceId: "instance_1",
    topics: ["notifications"],
    autoOffsetReset: "earliest",
  });

  console.log(messages);
}
