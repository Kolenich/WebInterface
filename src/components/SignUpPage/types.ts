import { WithStyles } from '@material-ui/styles';
import { IVariantIcons } from 'lib/generic/Snackbar/types';
import { RouteComponentProps } from 'react-router-dom';
import { styles } from './styles';

export interface IProps extends WithStyles<typeof styles>, RouteComponentProps {
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
  /** Флаг открытия снэкбара */
  snackbarOpen: boolean;
  /** Сообщение снэкбара */
  snackbarMessage: string;
  /** Статус снэкбара */
  snackbarVariant: keyof IVariantIcons;
}
