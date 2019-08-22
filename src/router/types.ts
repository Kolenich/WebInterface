import { IStore } from 'lib/context/types';
import { ComponentType } from 'react';
import { RouteProps } from 'react-router';

export interface IProps {
}

export interface IPropsContext extends IProps {
  /** Переменная контекста */
  context: IStore;
}

export interface ICustomRoutingProps extends RouteProps {
  /** Компонент */
  component: ComponentType<any>;
}
