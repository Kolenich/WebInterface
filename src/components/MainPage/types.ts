import { Theme, WithStyles } from '@material-ui/core';
import { ReactNode } from 'react';
import { styles } from './styles';

export interface IProps extends WithStyles<typeof styles> {
  /** Тема Material UI */
  theme: Theme;
}

export interface IState {
  /** Индекс активного пункта меню */
  value: number;
}

export interface ITabContainerProps {
  /** Дочерние DOM-элементы */
  children?: ReactNode;
  /** Указатель направления */
  dir?: string;
}
