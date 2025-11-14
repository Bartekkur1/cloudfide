export interface HttpClient {
  get: <T, K>(url: string, mapper?: (data: K) => T) => Promise<T>
}