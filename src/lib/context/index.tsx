import { AxiosError, AxiosResponse } from 'axios';
import React, { ComponentType, createContext, PureComponent, ReactNode } from 'react';
import { session } from '../session';
import { IProps, IState, IStore } from './types';

const Context = createContext({} as IStore);

/**
 * Класс Provider для контекста
 */
export class Provider extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  /**
   * Метд для обработки логина
   * @param email электронная почта пользователя
   * @param password пароль пользователя
   */
  private handleLogin = (email: string, password: string): boolean => {
    session.post('auth/login/', { email, password })
      .then((response: AxiosResponse) => {
        this.setState({ loggedIn: true });
        return true;
      })
      .catch((error: AxiosError) => {
        this.setState({ loggedIn: false });
        return false;
      });
    return false;
  }

  /**
   * Базовый метод рендера
   */
  public render(): ReactNode {
    const { children } = this.props;
    const store: IStore = {
      handleLogin: this.handleLogin,
      state: this.state,
    };
    return (
      <Context.Provider value={store}>
        {children}
      </Context.Provider>
    );
  }
}

export default <ComponentProps extends {}>
(Component: ComponentType<ComponentProps &
  {
    /** Передаем дочернему компоненту общий контекст */
    context: IStore;
  }>) =>
  class Consumer extends PureComponent<ComponentProps> {
    /**
     * Базовый метод рендера
     */
    public render(): ReactNode {
      return (
        <Context.Consumer>
          {(context: IStore) => <Component {...this.props} context={context} />}
        </Context.Consumer>
      );
    }
  };
