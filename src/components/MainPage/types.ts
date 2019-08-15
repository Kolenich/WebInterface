import { IStore } from '../../lib/context/types';
import { IRouterProps } from '../../lib/types';

export interface IProps extends IRouterProps {
}

export interface IPropsContext extends IProps {
  /** Переменная контекста */
  context: IStore;
}
