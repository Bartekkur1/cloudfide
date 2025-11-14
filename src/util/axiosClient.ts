import axios, { Axios } from "axios";
import { HttpClient } from "./types";

export class AxiosBasedHttpClient implements HttpClient {

  private client: Axios;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://data-api.binance.vision/api/v3'
    });
  }

  async get<T, K>(url: string, mapper?: (data: K) => T): Promise<T> {
    const response = await this.client.get(url);

    if (mapper !== undefined) {
      return mapper(response.data);
    }

    return response.data;
  }
}