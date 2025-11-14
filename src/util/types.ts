export interface HttpClient {
  /**
   * @throws {HttpClientError}
   */
  get: <T, K>(url: string, mapper?: (data: K) => T) => Promise<T>
}