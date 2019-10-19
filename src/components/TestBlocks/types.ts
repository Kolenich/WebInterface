import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { ComponentType } from 'react';
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
  icon: ComponentType<SvgIconProps>;
  /** Заголовок */
  title: string;
  /** Подзаголовок */
  subheader?: string;
}
