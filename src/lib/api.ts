import { AxiosPromise, AxiosResponse } from 'axios';
import { session, TASKS_APP } from './session';
import { HTTPMethods } from './types';

export default {
  /**
   * API-функция для получения данных с сервера
   * @param {string} requestUrl  url запроса
   * @param sendData запрашиваемое приложение
   * @param {string} app параметры запроса
   * @returns {AxiosPromise<T>}
   */
  getContent: <T>(requestUrl: string, sendData?: any, app?: string): AxiosPromise<T> => (
    new Promise<AxiosResponse<T>>((resolve, reject): void => {
      let params = sendData;
      if (!sendData) {
        params = {};
      }
      let prefix = app;
      if (!prefix) {
        prefix = TASKS_APP;
      }
      session.get<T>(`${prefix}/${requestUrl}/`, { params })
        .then(resolve)
        .catch(reject);
    })
  ),
  /**
   * API-функция для отправки данных на сервер
   * @param {string} requestUrl url запроса
   * @param {T} sendData параметры запроса
   * @param {string} app запрашиваемое приложение
   * @param {HTTPMethods} sendMethod  метод запроса
   * @returns {AxiosPromise<T>}
   */
  sendContent: <T>(
    requestUrl: string, sendData: T, app?: string, sendMethod?: HTTPMethods,
  ): AxiosPromise<T> => (
    new Promise<AxiosResponse<T>>((resolve, reject): void => {
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
      session({ method, data, url })
        .then(resolve)
        .catch(reject);
    })
  ),
};
