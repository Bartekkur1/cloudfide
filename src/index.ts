import express from 'express';
import { AxiosBasedHttpClient } from './util/axiosClient';
import { BianceApiClient } from './biance/api-client';

const axiosBasedClient = new AxiosBasedHttpClient();
const bianceApiClient = new BianceApiClient(axiosBasedClient);
const app = express();

// @TODO: Add parameters, handle validation and add analysis
app.get('/', async () => {
  const start = new Date();
  start.setDate(start.getDate() - 2);
  const end = new Date();

  await bianceApiClient.fetchHistoricalData(
    {
      currency: 'BTCUSDT',
      timeRange: {
        start, end
      },
      interval: '1d'
    }
  )
});

app.listen(3000, () => {
  console.log('App started!');
})