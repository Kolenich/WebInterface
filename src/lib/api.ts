import { AxiosError, AxiosPromise, AxiosResponse } from 'axios';
import { REST_API, session } from './session';
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
      let data = sendData;
      if (!sendData) {
        data = {};
      }
      let prefix = app;
      if (!prefix) {
        prefix = REST_API;
      }
      session
        .get<T>(`${prefix}/${requestUrl}/`, data)
        .then((response: AxiosResponse<T>) => resolve(response))
        .catch((error: AxiosError) => reject(error));
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
        prefix = REST_API;
      }
      const data: T = sendData;
      const url: string = `${prefix}/${requestUrl}/`;
      session({ method, data, url })
        .then((response: AxiosResponse<T>) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  },
};
