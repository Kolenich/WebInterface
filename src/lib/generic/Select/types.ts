import { ISelectElement } from 'lib/types';
import { ChangeEvent, ReactText } from 'react';

export interface IProps {
  /** Указатель обязательного для заполнения поля */
  required?: boolean;
  /** Массив значений для селекта */
  items: ISelectItem[];
  /** Текущее значение селекта */
  value: unknown;
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
