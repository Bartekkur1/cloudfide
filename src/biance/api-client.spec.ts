import { HttpClient } from "../util/types";
import { BianceApiClient } from "./api-client";

describe('Biance Api Client Tests', () => {
  let bianceApiClient: BianceApiClient;
  let httpClientMock: HttpClient = {
    get: async <T>(url: string, mapper?: (data: any) => T) => {
      return mapper!([
        [
          123,
          "1",
          "2",
          "3",
          "4",
          "5",
          456,
          "2800641845.73509930",
          5438029,
          "12430.72923000",
          "1207619658.24108420",
          "0"
        ]
      ]) as T;
    },
  };
  const getSpy = jest.spyOn(httpClientMock, 'get');

  beforeAll(() => {
    bianceApiClient = new BianceApiClient(httpClientMock);
  });


  test('Should return BTC price', async () => {
    const start = new Date();
    const end = new Date(new Date().getTime() + 3600 * 1000);

    const result = await bianceApiClient.fetchHistoricalData(
      {
        currency: 'BTC',
        timeRange: {
          start, end
        },
        interval: '1d'
      }
    );

    const url = getSpy.mock.calls[0][0];
    expect(url).toBe(
      `klines?symbol=BTC&interval=1d&startTime=${start.getTime()}&endTime=${end.getTime()}`
    );
    expect(result).not.toBeUndefined();
    expect(result).toHaveLength(1);
    expect(result[0].openTime).toBe(123);
    expect(result[0].openPrice).toBe(1);
    expect(result[0].highPrice).toBe(2);
    expect(result[0].lowPrice).toBe(3);
    expect(result[0].closePrice).toBe(4);
  });

  test('Should throw error on invalid time range (end < start)', async () => {
    try {
      await bianceApiClient.fetchHistoricalData(
        {
          currency: 'BTC',
          timeRange: {
            start: new Date(new Date().getTime() + 3600 * 1000),
            end: new Date()
          },
          interval: '1d'
        }
      );
    } catch (error) {
      expect(error).not.toBeUndefined();
      expect((error as Error).message).toBe('Invalid time range');
      return;
    }

    throw new Error('Should not reach this point');
  })

  test('Should handle network error', async () => {
    try {
      getSpy.mockImplementation(() => {
        throw new Error('Network error');
      })
      await bianceApiClient.fetchHistoricalData({
        currency: 'BTC',
        timeRange: {
          start: new Date(),
          end: new Date(new Date().getTime() + 3600 * 1000)
        },
        interval: '1d'
      });
    } catch (error) {
      console.log(error);
      expect(error).not.toBeUndefined();
      expect((error as Error).message).toBe('Network error');
      getSpy.mockRestore();
      return;
    }

    throw new Error('Should not reach this point');
  });

});