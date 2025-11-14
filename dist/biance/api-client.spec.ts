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


  test('Should not throw error', async () => {
    bianceApiClient.fetchHistoricalData('BTC', {
      start: new Date(),
      end: new Date(new Date().getTime() + 3600 * 1000)
    });
  });

});