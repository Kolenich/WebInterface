import { AxiosError, AxiosPromise, AxiosResponse } from 'axios';
import { API_URL, session } from './session';
import { HTTPMethods } from './types';

export default {
  /**
   * API-функция для получения данных с сервера
   * @param requestUrl - url запроса
   * @param sendData - параметры запроса
   */
  getContent<T>(requestUrl: string, sendData?: any): AxiosPromise<T> {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      let data = sendData;
      if (!sendData) {
        data = {};
      }
      session
        .get<T>(`${API_URL}/${requestUrl}/`, data)
        .then((response: AxiosResponse<T>) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  },
  /**
   * API-функция для отправки данных на сервер
   * @param requestUrl - url запроса
   * @param sendData - параметры запроса
   * @param sendMethod - метод запроса
   */
  sendContent<T>(requestUrl: string, sendData: T, sendMethod?: HTTPMethods):
    AxiosPromise<T> {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      let method = sendMethod;
      if (!method) {
        method = 'post';
      }
      const data: T = sendData;
      const url: string = `${API_URL}/${requestUrl}/`;
      session({ method, data, url })
        .then((response: AxiosResponse<T>) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  },
};
