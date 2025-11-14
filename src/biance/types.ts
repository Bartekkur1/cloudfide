export interface Kline {
  openTime: number;
  closeTime: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
}

export interface HttpClient {
  get: () => Promise<void>
}

export type TimeRange = {
  start: Date;
  end: Date;
}