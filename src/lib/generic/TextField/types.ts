import { WithStyles } from '@material-ui/core';
import { GridSize } from '@material-ui/core/Grid';
import { ChangeEvent, ComponentState } from 'react';
import { Validation } from '../../validation';
import { styles } from './styles';

export interface IProps extends WithStyles<typeof styles> {
  /** Размер в Grid-сетке на маленьких экранах */
  xs: GridSize;
  /** Размер в Grid-сетке на больштх экранах */
  lg: GridSize;
  /** Имя поля в объекте */
  name: string;
  /** Значение в текстовом поле */
  fieldValue: string | null;
  /** Указатель обязательного для заполнения поля */
  required?: boolean;
  /** Тип валидации на поле */
  validationType?: Validation;
  /** Ярлык для текстового поля */
  label: string;
  /** Функция для обработки изменения в текстовом поле */
  onChange: (event: ChangeEvent<HTMLInputElement>) => ComponentState;
}
