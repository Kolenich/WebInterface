export interface IProps {

}

export interface IState {
  /** Указатель залогинен пользователь или нет */
  loggedIn: boolean;
}

export interface IStore {
  /** Хранилище глобальных переменных */
  state: IState;
}
