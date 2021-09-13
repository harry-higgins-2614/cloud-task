import { toExternalEvent } from '../../src/js/toExternalEvent';

/**
 * Remove `.skip` when tests are ready to be executed
 */

describe.skip('toExternalEvent', () => {
  const input = {
    orderId: Date.now(),
    timestamp: Date.now(),
    product_provider: Date.now().toString(),
  };
  const result = toExternalEvent(input);

  it('Maps orderId to product_order_id_buyer', () => {
    expect(result.product_order_id_buyer).toEqual(input.orderId);
  });

  it('Maps product_provider to product_provider_buyer', () => {
    expect(result.product_provider_buyer).toEqual(input.product_provider);
  });

  it('Converts the Unix timestamp to ISO format', () => {
    /**
     * RegEx for ISO format, e.g. 2021-09-13T13:32:43.828Z
     */
    expect(result.timestamp).toMatch(
      /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z/
    );
  });

  it('Retains the correct date during conversion', () => {
    expect(new Date(result.timestamp).getTime()).toEqual(input.timestamp);
  });
});
