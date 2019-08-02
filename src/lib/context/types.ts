export interface IProps {

}

export interface IState {
  /** Указатель залогинен пользователь или нет */
  loggedIn: boolean;
}

export interface IStore {
  /** Хранилище глобальных переменных */
  state: IState;
  /** Функция для обработки логина */
  handleLogin: (email: string, password: string) => boolean;
}

export interface IContext {
  /** Общее хранилище приложения */
  context: IStore;
}
