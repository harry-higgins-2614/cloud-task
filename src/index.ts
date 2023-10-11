import { KinesisStreamEvent } from 'aws-lambda';
import BookingCompleteEvent from './Models/BookingCompleteEvent';
import BookingEvent from './Models/BookingEvent';

export const handler = (event: KinesisStreamEvent) => {
  event.Records.forEach(({ kinesis }) => {
    const payload = decodeBase64toString(kinesis.data);
    const json = JSON.parse(payload);

    // - Your function should pick out `booking_completed` events and ignore other event types
    if (json.type !== 'booking_completed') {
      return;
    }

    // - Your function should transform events into the format defined in the [JSON Schema](./external-service/schema.json)
    const bookingEvent = new BookingEvent(json);
    const event = new BookingCompleteEvent({
      product_order_id_buyer: bookingEvent.booking_completed.orderId,
      timestamp: new Date(bookingEvent.timestamp).toISOString(),
      product_provider_buyer: bookingEvent.booking_completed.product_provider,
    });

    // The URL to post data to. 
    const url: string | undefined = process.env.PUBLISH_URL;

    // If no URL is set, error and return.
    if (!url) {
      console.error('PUBLISH_URL not set');
      return;
    }

    // - Your function should publish events to the [Mock Server](#mock-server)
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(event),
      headers: { 'Content-Type': 'application/json' },
    });
  });
};

const decodeBase64toString = function (payload: string): string {
  return Buffer.from(payload, 'base64').toString('utf-8');
};
