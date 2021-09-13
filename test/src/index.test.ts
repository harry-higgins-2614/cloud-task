import { handler } from '../../src';

describe('handler', () => {
  it('Returns a promise', async () => {
    const result = await handler({});
    expect(result).toEqual({});
  });
});
