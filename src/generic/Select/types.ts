import { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import { ReactText } from 'react';

export interface IProps extends OutlinedTextFieldProps {
  /** Массив значений для селекта */
  items: ISelectItem[];
}

export interface ISelectItem {
  /** Значение для селекта */
  value: ReactText;
  /** Ключ для массива */
  key: ReactText;
  /** Ярлык для селекта */
  label: string;
}
