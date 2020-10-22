import session from './session';
import { HTTPMethods, IHeaders } from './types';

export default {
  /**
   * API-функция для получения данных с сервера
   * @param {string} url url запроса
   * @param {P} params параметры запроса
   * @return {Promise<AxiosResponse<T>>}
   */
  getContent: async <T, P = {}>(url: string, params?: P) => session.get<T>(url, { params }),
  /**
   * API-функция для отправки данных на сервер
   * @param {string} url url запроса
   * @param {T} data параметры запроса
   * @param {IHeaders} headers дополнительные заголовки запроса
   * @param {HTTPMethods} method  метод запроса
   * @returns {AxiosPromise<T>}
   */
  sendContent:
    async <T>(url: string, data: T, method: HTTPMethods = 'post', headers?: IHeaders) => {
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
