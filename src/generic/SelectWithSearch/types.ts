import { ReactText } from 'react';
import { ValueType } from 'react-select/src/types';
import { ISelectItem } from '../Select/types';

export interface IProps {
  /** Набор опций для выбора в селекте */
  options: ISelectItem[];
  /** Текущее значение */
  value: ReactText;
  /** Ярлык селекта */
  label: string;
  /** Колбэк, передающий выбранное значение */
  onChange: (option: ValueType<ISelectItem>) => void;
}

export interface IInputValue {
  /** Вводимое значение */
  inputValue: string;
}
