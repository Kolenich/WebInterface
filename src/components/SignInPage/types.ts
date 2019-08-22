import { WithStyles } from '@material-ui/styles';
import { IStore } from 'lib/context/types';
import { RouteComponentProps } from 'react-router-dom';
import { styles } from './styles';

export interface IProps extends WithStyles<typeof styles>, RouteComponentProps {
  /** Переменная контекста */
  context: IStore;
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
