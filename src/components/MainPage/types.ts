import { Theme, WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IProps extends WithStyles<typeof styles> {
  /** Тема Material UI */
  theme: Theme;
}

export interface IState {
  /** Указатель зарегистрирован пользователь или нет */
  loggedIn: boolean;
}
