import { ComponentType } from 'react';
import { RouteProps } from 'react-router';

export interface IProps {
}

export interface ICustomRoutingProps extends RouteProps {
  /** Компонент */
  component: ComponentType<any>;
}
