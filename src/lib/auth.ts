import { session } from './session';

export const TOKEN = 'token';

export default {
  // Имя токена авторизации
  TOKEN,

  /**
   * Функция для логина в систему
   * @param {string} username имя пользователя
   * @param {string} password пароль
   * @param {boolean} remember флаг для запоминания пользователя
   * @returns {AxiosPromise<IAuthResponse>}
   */
  async login(username: string, password: string, remember?: boolean) {
    try {
      const response = await session.post('auth/login/', { username, password });
      const { key } = response.data;
      this.saveToken(key, remember);
      this.setHeader(key);
      return response;
    } catch (error) {
      this.delHeader();
      this.delToken();
      return error;
    }
  },

  /**
   * Функция разлогина из системы
   * @returns {AxiosPromise}
   */
  async logout() {
    this.delHeader();
    this.delToken();
    try {
      return await session.post('auth/logout/', {});
    } catch (error) {
      return error;
    }
  },

  /**
   * Функция, устанавливающая заголовок авторизации в сессию
   * @param {string} token токен авторизации
   */
  setHeader(token: string) {
    session.defaults.headers.common.Authorization = `Token ${token}`;
  },

  /**
   * Функция, удаляющая заголовок авторизации в сессию
   */
  delHeader() {
    delete (session.defaults.headers.common.Authorization);
  },

  /**
   * Функция, удаляющая токен авторизации из локального хранилища
   */
  delToken() {
    sessionStorage.removeItem(TOKEN);
    localStorage.removeItem(TOKEN);
  },

  /**
   * Функция, сохраняющая токен авторизации в локальное хранилище
   * @param {string} token токен авторизации
   * @param {boolean} remember флаг для запоминания пользователя
   */
  saveToken(token: string, remember?: boolean) {
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
   * @returns {boolean}
   */
  checkToken() {
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
