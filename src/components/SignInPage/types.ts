import { WithStyles } from '@material-ui/styles';
import { RouteComponentProps } from 'react-router-dom';
import { styles } from './styles';

export interface IProps extends WithStyles<typeof styles>, RouteComponentProps {
}

export interface ILogin {
  /** Электронная почта */
  email: string;
  /** Пароль */
  password: string;
}

export interface IStatus {
  /** Флаг ошибки */
  error: boolean;
  /** Флаг загрузки */
  loading: boolean;
  /** Флаг "Запомнить" */
  remember: boolean;
}
