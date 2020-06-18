import { session, TASKS_APP } from './session';
import { HTTPMethods, IHeaders } from './types';

export default {
  /**
   * API-функция для получения данных с сервера
   * @param {string} requestUrl url запроса
   * @param {P} sendData параметры запроса
   * @param {string} app запрашиваемое приложение
   * @return {Promise<AxiosResponse<T>>}
   */
  getContent: async <T, P = {}>(requestUrl: string, sendData?: P, app?: string) => {
    const params = sendData || {};
    const prefix = app || TASKS_APP;
    return await session.get<T>(`${prefix}/${requestUrl}/`, { params });
  },
  /**
   * API-функция для отправки данных на сервер
   * @param {string} requestUrl url запроса
   * @param {T} sendData параметры запроса
   * @param {IHeaders} headers дополнительные заголовки запроса
   * @param {string} app запрашиваемое приложение
   * @param {HTTPMethods} sendMethod  метод запроса
   * @returns {AxiosPromise<T>}
   */
  sendContent: async <T>(
    requestUrl: string, sendData: T, app?: string, sendMethod?: HTTPMethods, headers?: IHeaders,
  ) => {
    const method = sendMethod || 'post';
    const prefix = app || TASKS_APP;
    const data: T = sendData;

    const url = `${prefix}/${requestUrl}/`;

    const defaultHeaders = { ...session.defaults.headers };
    if (headers) {
      for (const key of Object.keys(headers)) {
        session.defaults.headers[key] = headers[key];
      }
    }
    try {
      return await session({ method, data, url });
    } finally {
      session.defaults.headers = defaultHeaders;
    }
  },
};
