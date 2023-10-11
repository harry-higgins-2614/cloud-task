import { handler } from '../index';

describe('handler', () => {
  const mockFetch = jest.fn();
  const mockError = jest.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    // reset state of mockFetch
    mockFetch.mockClear();
    // set global.fetch to be mockFetch. cast global as any since it will not have fetch on it by default
    (global as any).fetch = mockFetch;

    (global as any).console.error = mockError;
    // clear PUBLISH_URL from the environment. this will be set in each test case as needed
    delete process.env.PUBLISH_URL;
  });

  beforeAll(() => {
    // mock console.error so we can assert on it
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    mockError.mockRestore();
  });

  afterEach(() => {
    mockError.mockClear();
  });

  it('should publish booking_completed events to the mock server', () => {
    const event = {
      Records: [
        {
          awsRegion: 'us-east-1',
          eventID:
            'shardId-000000000000:123456789012345678901234567890123456789012345678901234567890:0',
          eventName: 'aws:kinesis:record',
          eventSource: 'aws:kinesis',
          eventSourceARN:
            'arn:aws:kinesis:us-east-1:123456789012:stream/example-stream',
          eventVersion: '1.0',
          invokeIdentityArn: 'arn:aws:iam::123456789012:role/lambda-role',
          kinesis: {
            approximateArrivalTimestamp: 1545084650,
            data: Buffer.from(
              JSON.stringify({
                type: 'booking_completed',
                timestamp: 1631538059459,
                booking_completed: {
                  orderId: '123',
                  product_provider: 'Acme Inc.',
                },
              })
            ).toString('base64'),
            kinesisSchemaVersion: '1.0',
            partitionKey: 'partitionKey-03',
            sequenceNumber:
              '49545115243490985018280067714973144582180062593244200961',
          },
        },
      ],
    };

    const mockResponse = { status: 200 };
    mockFetch.mockResolvedValueOnce(mockResponse);

    process.env.PUBLISH_URL = 'http://localhost:3000';

    handler(event);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000', {
      method: 'POST',
      body: JSON.stringify({
        product_order_id_buyer: '123',
        timestamp: '2021-09-13T13:00:59.459Z',
        product_provider_buyer: 'Acme Inc.',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('should ignore non-booking_completed events', () => {
    const event = {
      Records: [
        {
          awsRegion: 'us-east-1',
          eventID:
            'shardId-000000000000:123456789012345678901234567890123456789012345678901234567890:0',
          eventName: 'aws:kinesis:record',
          eventSource: 'aws:kinesis',
          eventSourceARN:
            'arn:aws:kinesis:us-east-1:123456789012:stream/example-stream',
          eventVersion: '1.0',
          invokeIdentityArn: 'arn:aws:iam::123456789012:role/lambda-role',
          kinesis: {
            approximateArrivalTimestamp: 1545084650,
            data: Buffer.from(
              JSON.stringify({
                type: 'booking_cancelled',
                timestamp: 1631538059459,
                booking_completed: {
                  orderId: '123',
                  product_provider: 'Acme Inc.',
                },
              })
            ).toString('base64'),
            kinesisSchemaVersion: '1.0',
            partitionKey: 'partitionKey-03',
            sequenceNumber:
              '49545115243490985018280067714973144582180062593244200961',
          },
        },
      ],
    };

    handler(event);

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should log an error if PUBLISH_URL is not set', () => {
    const event = {
      Records: [
        {
          awsRegion: 'us-east-1',
          eventID:
            'shardId-000000000000:123456789012345678901234567890123456789012345678901234567890:0',
          eventName: 'aws:kinesis:record',
          eventSource: 'aws:kinesis',
          eventSourceARN:
            'arn:aws:kinesis:us-east-1:123456789012:stream/example-stream',
          eventVersion: '1.0',
          invokeIdentityArn: 'arn:aws:iam::123456789012:role/lambda-role',
          kinesis: {
            approximateArrivalTimestamp: 1545084650,
            data: Buffer.from(
              JSON.stringify({
                type: 'booking_completed',
                timestamp: 1631538059459,
                booking_completed: {
                  orderId: '123',
                  product_provider: 'Acme Inc.',
                },
              })
            ).toString('base64'),
            kinesisSchemaVersion: '1.0',
            partitionKey: 'partitionKey-03',
            sequenceNumber:
              '49545115243490985018280067714973144582180062593244200961',
          },
        },
      ],
    };

    handler(event);

    expect(mockError).toHaveBeenCalledWith('PUBLISH_URL not set');
    expect(mockFetch).not.toHaveBeenCalled();

    mockError.mockRestore();
    mockError.mockClear();
  });
});
