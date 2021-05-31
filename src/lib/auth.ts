import { ReactText } from 'react';
import session from './session';

/**
 * Класс-помощник для авторизации
 */
class Auth {
  /**
   * Имя, под которым токен хранится в localStorage (sessionStorage)
   * @type {string}
   */
  token = 'Token';

  /**
   * Заголовок для авторизации
   * @type {string}
   */
  authHeader = 'Authorization';

  /**
   * Функция для логина в систему
   * @param {string} username - имя пользователя
   * @param {string} password - пароль
   * @param {boolean} remember - запоминание при логине
   * @returns {Promise<void>}
   */
  login = async (username: string, password: string, remember = false) => {
    const { data } = await session.post('auth/login/', { username, password });
    this.setHeader(this.authHeader, `Token ${data.key}`);
    this.setToken(data.key, remember);
  }

  /**
   * Функция выхода из системы
   * @returns {Promise<AxiosResponse<any>>}
   */
  logout = async () => {
    try {
      await session.post('auth/logout/');
    } finally {
      this.deleteHeader(this.authHeader);
      this.deleteToken();
    }
  }

  /**
   * Функция проверки наличия токена
   * @returns {boolean}
   */
  checkToken = () => {
    const token = sessionStorage.getItem(this.token) || localStorage.getItem(this.token);
    if (token) {
      this.setHeader(this.authHeader, `Token ${token}`);
    }
    return !!token;
  }

  /**
   * Функция установки заголовка
   * @param {string} name
   * @param {React.ReactText} value
   */
  private setHeader = (name: string, value: ReactText) => {
    session.defaults.headers.common[name] = value;
  }

  /**
   * Функция удаления заголовка из запроса
   * @param {string} name - имя заголовка
   */
  private deleteHeader = (name: string) => {
    delete session.defaults.headers.common[name];
  }

  /**
   * Функция сохранения токена
   * @param {string} token - сам токен
   * @param {boolean} remember - запоминание
   */
  private setToken = (token: string, remember: boolean) => {
    if (remember) {
      sessionStorage.setItem(this.token, token);
    } else {
      localStorage.setItem(this.token, token);
    }
  }

  /**
   * Функция удаления токена
   */
  private deleteToken = () => {
    sessionStorage.removeItem(this.token);
    localStorage.removeItem(this.token);
  }
}

export default new Auth();
