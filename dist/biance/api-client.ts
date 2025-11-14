import { HttpClient, Kline, TimeRange } from './types';

export class BianceApiClient {

  constructor(private readonly httpClient: HttpClient) { }

  async fetchHistoricalData(currency: string, timeRange: TimeRange): Promise<Kline[]> {
    throw new Error('Not implemeneted yet!');
  }

}