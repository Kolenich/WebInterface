import { session } from './session';

export const TOKEN = 'kolenich';

export default {
  // Имя токена авторизации
  TOKEN,
  /**
   * Функция для логина в систему
   * @param username имя пользователя
   * @param password пароль
   * @param remember флаг для запоминания пользователя
   */
  async login(username: string, password: string, remember?: boolean): Promise<boolean> {
    const { data } = await session.post('auth/login/', { username, password });
    if (data) {
      const { key } = data;
      this.saveToken(key, remember);
      this.setHeader(key);
      return data;
    }
    return false;
  },

  /**
   * Функция разлогина из системы
   */
  async logout(): Promise<boolean> {
    const response = await session.post('auth/logout/', {});
    if (response) {
      this.delHeader();
      this.delToken();
    }
    return !!response;
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
