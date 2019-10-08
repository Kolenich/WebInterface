import { DatePickerProps } from '@material-ui/pickers';

export interface IProps extends DatePickerProps {
  /** Указатель, что надо отобразить пикер с временем */
  withTime?: boolean;
}
