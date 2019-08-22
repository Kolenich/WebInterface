import { session } from './session';

export const TOKEN = 'token';

export default {
  TOKEN,
  async login(username: string, password: string): Promise<boolean> {
    const { data } = await session.post('auth/login/', { username, password });
    if (data) {
      const { key } = data;
      this.saveToken(key);
      this.setHeader(key);
      return data;
    }
    return false;
  },

  async logout(): Promise<boolean> {
    const response = await session.post('auth/logout/', {});
    if (response) {
      this.delHeader();
      this.delToken();
      return true;
    }
    return false;
  },

  setHeader(token: string) {
    session.defaults.headers.common.Authorization = `Token ${token}`;
  },

  delHeader() {
    delete (session.defaults.headers.common.Authorization);
  },

  delToken() {
    localStorage.removeItem(TOKEN);
  },

  saveToken(token: string) {
    localStorage.setItem(TOKEN, token);
    this.setHeader(token);
  },

  checkToken(token: string | null): boolean {
    if (token) {
      session.defaults.headers.common.Authorization = `Token ${token}`;
      return true;
    }
    return false;
  },

};
