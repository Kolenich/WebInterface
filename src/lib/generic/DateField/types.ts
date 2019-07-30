import { WithStyles } from '@material-ui/core';
import { GridSize } from '@material-ui/core/Grid';
import { MaterialUiPickersDate } from '@material-ui/pickers';
import { ComponentState } from 'react';
import { styles } from './styles';

export interface IProps extends WithStyles<typeof styles> {
  /** Размер в Grid-сетке на маленьих экранах */
  xs: GridSize;
  /** Размер в Grid-сетке на больших экранах */
  lg: GridSize;
  /** Указатель обязательного для заполнения поля */
  required?: boolean;
  /** Текущее значение селекта */
  value: string | null;
  /** Ярлык селекта */
  label: string;
  /** Функция, отвечающая за изменение даты */
  onChange: (date: MaterialUiPickersDate) => ComponentState;
}
