import { IStore } from '../../lib/context/types';

export interface IProps {
}

export interface IPropsContext extends IProps {
  /** Переменная контекста */
  context: IStore;
}
