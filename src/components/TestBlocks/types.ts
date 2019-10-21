import { SvgIconComponent } from '@material-ui/icons';
import { RouteComponentProps } from 'react-router';

export interface IProps extends RouteComponentProps<IParams> {
}

interface IParams {
  /** Первичный ключ */
  id: string;
}

export interface ICard {
  /** Ключ карточки в массиве */
  key: number;
  /** Иконка */
  icon: SvgIconComponent;
  /** Заголовок */
  title: string;
  /** Подзаголовок */
  subheader?: string;
  /** Показываемые шаги */
  steps: IStep[];
}

export interface IStep {
  /** Ключ шага */
  key: number;
  /** Заголовок */
  title: string;
  /** Выполнен ли шаг */
  completed: boolean;
  /** Описание шага */
  description?: string;
}
