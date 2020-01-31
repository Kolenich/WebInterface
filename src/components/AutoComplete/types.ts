import { ChangeEvent, ReactText } from 'react';
import { ISelectItem } from '../Select/types';

export interface IProps {
  /** Набор опций для выбора в селекте */
  options: ISelectItem[];
  /** Текущее значение */
  value: ReactText | null;
  /** Ярлык селекта */
  label: string;
  /** Колбэк, передающий выбранное значение */
  onChange: (event: ChangeEvent<{}>, option: ISelectItem | null) => void;
}
