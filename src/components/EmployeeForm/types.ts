import { WithStyles } from '@material-ui/core';
import { ComponentState } from 'react';
import { IEmployee } from '../../lib/types';
import { styles } from './styles';

export interface IProps extends WithStyles<typeof styles> {
  /** id объекта IEmployee для поиска в БД */
  id: number;
  /** Переменная, отвечающая за открытие модального окна */
  open: boolean;
  /** Функция-колбэк, закрывающая модальное окно */
  onClose: () => ComponentState;
  /** Функция-колбэк, обновляющая родительскую таблицу */
  updateTable: () => ComponentState;
}

export interface IState {
  /** Объект Employee */
  employee: IEmployee;
  /** Переменная для валидации даты */
  dateOfBirthNotNull: boolean;
  /** Переменная, отвечающая за открытие окна статуса */
  statusWindowOpen: boolean;
  /** Сообщение, преедаваемое в окно статуса */
  statusMessage: string;
  /** Статус */
  statusType: 'success' | 'error' | 'warning' | 'loading';
}
