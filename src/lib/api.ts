import { AxiosPromise, AxiosResponse } from 'axios';
import { session, TASKS_APP } from './session';
import { HTTPMethods } from './types';

export default {
  /**
   * API-функция для получения данных с сервера
   * @param requestUrl - url запроса
   * @param app - запрашиваемое приложение
   * @param sendData - параметры запроса
   */
  getContent<T>(requestUrl: string, sendData?: any, app?: string): AxiosPromise<T> {
    return new Promise<AxiosResponse<T>>((resolve, reject): void => {
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
    });
  },
  /**
   * API-функция для отправки данных на сервер
   * @param requestUrl - url запроса
   * @param sendData - параметры запроса
   * @param app - запрашиваемое приложение
   * @param sendMethod - метод запроса
   */
  sendContent<T>(requestUrl: string, sendData: T, app?: string, sendMethod?: HTTPMethods):
    AxiosPromise<T> {
    return new Promise<AxiosResponse<T>>((resolve, reject): void => {
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
    });
  },
};
