import { WithStyles } from '@material-ui/styles';
import { IStore } from 'lib/context/types';
import { RouteComponentProps } from 'react-router-dom';
import { IVariantIcons } from '../../lib/generic/Snackbar/types';
import { styles } from './styles';

export interface IProps extends WithStyles<typeof styles>, RouteComponentProps {
  /** Переменная контекста */
  context: IStore;
}

export interface ISnackbarProps {
  /** Флаг открытия/закрытия */
  open: boolean;
  /** Сообщение на снэкбаре */
  message: string;
  /** Статус снэкбара */
  variant: keyof IVariantIcons;
}
