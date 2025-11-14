import { BianceApiClient } from "./api-client";
import { HttpClient } from "./types";


describe('Biance Api Client Tests', () => {
  let bianceApiClient: BianceApiClient;
  let httpClientMock: HttpClient = {
    get: async () => { }
  }

  beforeAll(() => {
    bianceApiClient = new BianceApiClient(httpClientMock);
  });


  test('Should return BTC price', async () => {
    const result = await bianceApiClient.fetchHistoricalData('BTC', {
      start: new Date(),
      end: new Date(new Date().getTime() + 3600 * 1000)
    });

    expect(result).not.toBeUndefined();
    expect(result).toHaveLength(1);
  });

  test('Should throw error on invalid time range (end < start)', async () => {
    try {
      await bianceApiClient.fetchHistoricalData('BTC', {
        start: new Date(new Date().getTime() + 3600 * 1000),
        end: new Date()
      });
    } catch (error) {
      expect(error).not.toBeUndefined();
      expect((error as Error).message).toEqual('Invalid time range');
    }
  })

  test('Should handle network error', async () => {
    try {
      await bianceApiClient.fetchHistoricalData('BTC', {
        start: new Date(),
        end: new Date(new Date().getTime() + 3600 * 1000)
      });
    } catch (error) {
      expect(error).not.toBeUndefined();
      expect((error as Error).message).toEqual('Network error');
    }
  });

});