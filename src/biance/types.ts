export interface Kline {
  openTime: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
  closeTime: number;
}

export type TimeRange = {
  start: Date;
  end: Date;
}

export interface FechHistoricalDataParams {
  currency: string;
  timeRange: TimeRange;
  interval: string;
}