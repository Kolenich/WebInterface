import { ComponentType } from 'react';
import { RouteProps } from 'react-router';

export interface ICustomRoutingProps extends RouteProps {
  /** Компонент */
  component: ComponentType<any>;
}
