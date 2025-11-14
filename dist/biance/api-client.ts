import { HttpClient, TimeRange } from './types';

export class BianceApiClient {

  constructor(private readonly httpClient: HttpClient) { }

  fetchHistoricalData(currency: string, timeRange: TimeRange) {
    throw new Error('Not implemeneted yet!');
  }

}