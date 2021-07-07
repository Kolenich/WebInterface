import auth from './auth';
import session from './session';
import { HTTPMethods, IHeaders } from './types';
import { getWebsocketUrl } from './utils';

class API {
  /**
   * API-функция для получения данных с сервера
   * @param {string} url url запроса
   * @param {P} params параметры запроса
   * @return {Promise<AxiosResponse<T>>}
   */
  getContent = <T, P = Record<string, unknown>>(url: string, params?: P) => (
    session.get<T>(url, { params })
  )

  /**
   * API-функция для отправки данных на сервер
   * @param {string} url url запроса
   * @param {T} data параметры запроса
   * @param {IHeaders} headers дополнительные заголовки запроса
   * @param {HTTPMethods} method  метод запроса
   * @returns {AxiosPromise<T>}
   */
  sendContent = <T>(url: string, data: T, method: HTTPMethods = 'post', headers?: IHeaders) => {
    const defaultHeaders = { ...session.defaults.headers };
    if (headers) {
      Object.keys(headers).forEach((key) => Object.assign(session.defaults.headers, {
        [key]: headers[key],
      }));
    }
    try {
      return session({ method, data, url });
    } finally {
      session.defaults.headers = defaultHeaders;
    }
  }

  /**
   * Функция подключения к вебсокету
   * @param {string} path - путь до вебсокета
   * @return {WebSocket}
   */
  websocket = (path: string) => {
    document.cookie = `token=${auth.getToken()};max-age=${60 * 60 * 24};path=/;samesite=Strict`;

    return new WebSocket(`${getWebsocketUrl()}/ws/${path}/`);
  }
}

export default new API();
