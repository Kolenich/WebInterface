import { session } from './session';
import { HTTPMethods, IHeaders } from './types';

export default {
  /**
   * API-функция для получения данных с сервера
   * @param {string} requestUrl url запроса
   * @param {P} params параметры запроса
   * @return {Promise<AxiosResponse<T>>}
   */
  getContent: async <T, P = {}>(requestUrl: string, params?: P) => (
    session.get<T>(`${requestUrl}/`, { params })
  ),
  /**
   * API-функция для отправки данных на сервер
   * @param {string} requestUrl url запроса
   * @param {T} data параметры запроса
   * @param {IHeaders} headers дополнительные заголовки запроса
   * @param {HTTPMethods} sendMethod  метод запроса
   * @returns {AxiosPromise<T>}
   */
  sendContent:
    async <T>(requestUrl: string, data: T, sendMethod?: HTTPMethods, headers?: IHeaders) => {
      const method = sendMethod || 'post';

      const url = `${requestUrl}/`;

      const defaultHeaders = { ...session.defaults.headers };
      if (headers) {
        for (const key of Object.keys(headers)) {
          session.defaults.headers[key] = headers[key];
        }
      }
      try {
        return session({ method, data, url });
      } finally {
        session.defaults.headers = defaultHeaders;
      }
    },
};
