import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'test-producer',
    brokers: ['skilled-krill-9269-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username:
        'c2tpbGxlZC1rcmlsbC05MjY5JPQeephPFlZZaikGOqeH2Wo_8Mlfteg9_4VqoFE',
      password:
        'KX-q16nVcH8jBZwYRdYDvYKFgn3AjEzBfPqkfrikmD2A_yz5PV7sxdnz52dhAoxjOKI34Q==',
    },
    ssl: true,
  })

  const producer = kafka.producer()

  await producer.connect()

  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade!',
          category: 'social',
          recipientId: randomUUID(),
        }),
      },
    ],
  })

  await producer.disconnect()
}

bootstrap()
