import { AxiosError, AxiosPromise, AxiosResponse } from 'axios';
import { session } from './session';
import { IAuthResponse } from './types';

export const TOKEN = 'token';

export default {
  // Имя токена авторизации
  TOKEN,
  /**
   * Функция для логина в систему
   * @param username имя пользователя
   * @param password пароль
   * @param remember флаг для запоминания пользователя
   */
  login(username: string, password: string, remember?: boolean): AxiosPromise<IAuthResponse> {
    return new Promise<AxiosResponse<IAuthResponse>>(((resolve, reject) => {
      session.post('auth/login/', { username, password })
        .then((response: AxiosResponse<IAuthResponse>) => {
          const { key } = response.data;
          this.saveToken(key, remember);
          this.setHeader(key);
          resolve(response);
        })
        .catch((error: AxiosError) => {
          this.delHeader();
          this.delToken();
          reject(error);
        });
    }));
  },

  /**
   * Функция разлогина из системы
   */
  logout(): AxiosPromise {
    return new Promise<AxiosResponse>(((resolve, reject) => {
      session.post('auth/logout/', {})
        .then((response: AxiosResponse) => {
          this.delHeader();
          this.delToken();
          resolve(response);
        })
        .catch((error: AxiosError) => {
          this.delHeader();
          this.delToken();
          reject(error);
        });
    }));
  },

  /**
   * Функция, устанавливающая заголовок авторизации в сессию
   * @param token токен авторизации
   */
  setHeader(token: string): void {
    session.defaults.headers.common.Authorization = `Token ${token}`;
  },

  /**
   * Функция, удаляющая заголовок авторизации в сессию
   */
  delHeader(): void {
    delete (session.defaults.headers.common.Authorization);
  },

  /**
   * Функция, удаляющая токен авторизации из локального хранилища
   */
  delToken(): void {
    sessionStorage.removeItem(TOKEN);
    localStorage.removeItem(TOKEN);
  },

  /**
   * Функция, сохраняющая токен авторизации в локальное хранилище
   * @param token токен авторизации
   * @param remember флаг для запоминания пользователя
   */
  saveToken(token: string, remember?: boolean): void {
    if (remember) {
      localStorage.setItem(TOKEN, token);
    } else {
      sessionStorage.setItem(TOKEN, token);
    }
    this.setHeader(token);
  },

  /**
   * Функция проверки наличия в локальном хранилище токена авторизации
   * В случае успешной проверки устанавливает заголовок авторизации в сессию
   */
  checkToken(): boolean {
    let token: string | null = localStorage.getItem(TOKEN);
    if (!token) {
      token = sessionStorage.getItem(TOKEN);
    }
    if (token) {
      session.defaults.headers.common.Authorization = `Token ${token}`;
      return true;
    }
    return false;
  },
};
