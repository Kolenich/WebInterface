import { DataTypeProviderProps } from '@devexpress/dx-react-grid';
import { ComponentState } from 'react';

export interface IProps extends DataTypeProviderProps {
  /** Функция, обрабатывающая клик */
  handleClick: IHandleCLick;
}

export type IHandleCLick = (id: number) => () => ComponentState;
