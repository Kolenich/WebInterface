import React, { ComponentType, createContext, PureComponent, ReactNode } from 'react';
import { IContext, IProps, IState, IStore } from './types';

const Context = createContext({} as IStore);

/**
 * Класс Provider для контекста
 */
export class Provider extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  /**
   * Базовый метод рендера
   */
  public render(): ReactNode {
    const { children } = this.props;
    const store: IStore = {};
    return (
      <Context.Provider value={store}>
        {children}
      </Context.Provider>
    );
  }
}

export default <ComponentProps extends {}>
(Component: ComponentType<ComponentProps & IContext>) =>
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
