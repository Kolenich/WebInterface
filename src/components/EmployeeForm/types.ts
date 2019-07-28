import { WithStyles } from '@material-ui/core';
import { GridSize } from '@material-ui/core/Grid';
import { ComponentState } from 'react';
import { IEmployee } from '../../lib/types';
import { Validation } from '../../lib/validation';
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

export interface ITextFieldProps {
  /** Размер в Grid-сетке на маленьих экранах */
  xs: GridSize;
  /** Размер в Grid-сетке на больших экранах */
  lg: GridSize;
  /** Имя поля в объекте Employee */
  fieldName: keyof IEmployee;
  /** Указатель обязательного для заполнения поля */
  required?: boolean;
  /** Тип валидации на поле */
  validationType?: Validation;
}

export interface ISelectFieldProps extends ITextFieldProps {
  /** Ширина ярлыка Select'а */
  labelWidth: number;
}
