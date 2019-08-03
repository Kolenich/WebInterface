import { GridSize } from '@material-ui/core/Grid';
import { ChangeEvent, ComponentState } from 'react';
import { ISelectElement } from '../../types';

export interface IProps {
  /** Размер в Grid-сетке на маленьих экранах */
  xs: GridSize;
  /** Размер в Grid-сетке на больших экранах */
  lg: GridSize;
  /** Указатель обязательного для заполнения поля */
  required?: boolean;
  /** Массив значений для селекта */
  items: ISelectItem[];
  /** Текущее значение селекта */
  value: string;
  /** Ярлык селекта */
  label: string;
  /** Функция, обрабатывающая изменение */
  handleChange: (event: ChangeEvent<ISelectElement>) => ComponentState;
}

export interface ISelectItem {
  /** Значение для селекта */
  value: string | number;
  /** Ключ для массива */
  key: string | number;
  /** Ярлык для селекта */
  label: string;
}
