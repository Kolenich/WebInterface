import { session, TASKS_APP } from './session';
import { HTTPMethods } from './types';

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
      return error;
    }
  },
  /**
   * API-функция для отправки данных на сервер
   * @param {string} requestUrl url запроса
   * @param {T} sendData параметры запроса
   * @param {string} app запрашиваемое приложение
   * @param {HTTPMethods} sendMethod  метод запроса
   * @returns {AxiosPromise<T>}
   */
  sendContent: async <T>(
    requestUrl: string, sendData: T, app?: string, sendMethod?: HTTPMethods,
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
    const url: string = `${prefix}/${requestUrl}/`;
    try {
      return await session({ method, data, url });
    } catch (error) {
      return error;
    }
  },
};
