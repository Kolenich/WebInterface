import { ComponentType } from 'react';
import { RouteProps } from 'react-router';

export interface IProps extends RouteProps {
  /** Компонент */
  component: ComponentType<any>;
}
