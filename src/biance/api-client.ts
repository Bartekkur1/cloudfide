import { HttpClientError } from '../util/errors';
import { HttpClient } from '../util/types';
import { InvalidInputError } from './errors';
import { FechHistoricalDataParams, Kline } from './types';


type RawKline = [number, string, string, string, string, string, number];

export class BianceApiClient {

  constructor(private readonly httpClient: HttpClient) { }

  private historicalDataMapper(rawData: RawKline[]): Kline[] {
    return rawData.map((e) => {
      const [openTime, openPrice, highPrice, lowPrice, closePrice, _, closeTime] = e;
      return {
        openTime,
        openPrice: parseFloat(openPrice),
        highPrice: parseFloat(highPrice),
        lowPrice: parseFloat(lowPrice),
        closePrice: parseFloat(closePrice),
        closeTime
      };
    })
  }

  // @TODO: validate interval format
  async fetchHistoricalData({ currency, interval, timeRange }: FechHistoricalDataParams): Promise<Kline[]> {
    try {
      if (timeRange.end < timeRange.start) {
        throw new InvalidInputError('Invalid time range');
      }

      const params = new URLSearchParams();
      params.append('symbol', currency);
      params.append('interval', interval);
      params.append('startTime', timeRange.start.getTime().toString());
      params.append('endTime', timeRange.end.getTime().toString());

      const response = await this.httpClient.get<Kline[], RawKline[]>(
        'klines?' + params.toString(),
        this.historicalDataMapper
      );

      return response;
    } catch (error) {
      if (error instanceof InvalidInputError) {
        throw error;
      } else if (error instanceof HttpClientError) {
        throw error;
      }

      throw new Error('Unrecognized error');
    }
  }
}