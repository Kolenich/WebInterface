import { WithStyles } from '@material-ui/core';
import { IStore } from '../../lib/context/types';
import { styles } from './styles';

export interface IProps extends WithStyles<typeof styles> {

}

export interface IPropsContext extends IProps {
  /** Переменная контекста */
  context: IStore;
}

export interface IState {
}
