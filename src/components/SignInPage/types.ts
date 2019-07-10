import { WithStyles } from '@material-ui/core';
import { IRouterProps } from '../../lib/types';
import { styles } from './styles';

export interface IProps extends WithStyles<typeof styles>, IRouterProps {

}

export interface IState {
  /** Вводимый логин пользователя */
  email: string;
  /** Вводимый пароль */
  password: string;
  /** Флаг загрузки */
  loading: boolean;
  /** Указатель для запоминания данных польхователя */
  remember: boolean;
  /** Указатель ошибки ввода логина или пароля */
  error: boolean;

  [index: string]: string | boolean;
}
