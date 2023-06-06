import { Kafka } from "@upstash/kafka";
import dummyjson from 'dummy-json';
import dotenv from 'dotenv';

const ENV = dotenv.config().parsed;
const { UPSTASH_KAFKA_REST_URL, UPSTASH_KAFKA_REST_USERNAME, UPSTASH_KAFKA_REST_PASSWORD } = ENV;

const kafka = new Kafka({
  url: UPSTASH_KAFKA_REST_URL,
  username: UPSTASH_KAFKA_REST_USERNAME,
  password: UPSTASH_KAFKA_REST_PASSWORD,
});

const p = kafka.producer();

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Objects will get serialized using "JSON.stringify"
while (true) {
  const template = `{
    "name": "{{firstName}}",
    "age": "{{int 18 65}}"
  }`;
  const message = dummyjson.parse(template);
  await p.produce("notifications", message);
  await sleep(2500);
}
