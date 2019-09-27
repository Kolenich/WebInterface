import { WithStyles } from '@material-ui/styles';
import { ISnackbarProps } from 'lib/types';
import { RouteComponentProps } from 'react-router-dom';
import { styles } from './styles';

export interface IProps extends WithStyles<typeof styles>, RouteComponentProps {
}

export interface IAccount {
  /** Имя */
  first_name: string;
  /** Фамилия */
  last_name: string;
  /** Электронная почта */
  email: string;
  /** Пароль */
  password: string;
  /** Рассылка на почту */
  mailing: boolean;
}

export interface IState {
  /** Имя */
  first_name: string;
  /** Фамилия */
  last_name: string;
  /** Электронная почта */
  email: string;
  /** Пароль */
  password: string;
  /** Флаг загрузки */
  loading: boolean;
  /** Конфиг для снэкбара */
  snackbar: ISnackbarProps;
  /** Ошибки в полях */
  errors: IErrors;
}

export interface IErrors {
  /** Флаг ошибки для почты */
  email?: boolean;
  /** Флаг имени для почты */
  first_name?: boolean;
  /** Флаг фамилии для почты */
  last_name?: boolean;
  /** Флаг пароля для почты */
  password?: boolean;

  [index: string]: boolean | undefined;
}
