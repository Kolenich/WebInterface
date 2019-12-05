import { session, TASKS_APP } from './session';
import { HTTPMethods, IHeaders } from './types';

export default {
  /**
   * API-функция для получения данных с сервера
   * @param {string} requestUrl url запроса
   * @param sendData запрашиваемое приложение
   * @param {string} app параметры запроса
   * @returns {AxiosPromise<T>}
   */
  getContent: async <T>(requestUrl: string, sendData?: any, app?: string) => {
    let params = sendData;
    if (!sendData) {
      params = {};
    }
    let prefix = app;
    if (!prefix) {
      prefix = TASKS_APP;
    }
    try {
      return await session.get<T>(`${prefix}/${requestUrl}/`, { params });
    } catch (error) {
      throw error;
    }
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
    let method = sendMethod;
    if (!method) {
      method = 'post';
    }
    let prefix = app;
    if (!prefix) {
      prefix = TASKS_APP;
    }
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
    } catch (error) {
      throw error;
    } finally {
      session.defaults.headers = defaultHeaders;
    }
  },
};
