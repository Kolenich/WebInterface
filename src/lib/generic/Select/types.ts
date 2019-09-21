import { GridSize } from '@material-ui/core/Grid';
import { ISelectElement } from 'lib/types';
import { ChangeEvent, ReactText } from 'react';

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
  handleChange: (event: ChangeEvent<ISelectElement>) => void;
}

export interface ISelectItem {
  /** Значение для селекта */
  value: ReactText;
  /** Ключ для массива */
  key: ReactText;
  /** Ярлык для селекта */
  label: string;
}
