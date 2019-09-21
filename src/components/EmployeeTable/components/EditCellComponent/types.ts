import { TableEditRow } from '@devexpress/dx-react-grid';
import { FunctionComponent } from 'react';

export interface IProps extends TableEditRow.CellProps {
  /** Флаг "только на чтение" */
  disabled?: boolean;
  /** Указатель, что поле типа email */
  isEmail?: boolean;
  /** Указатель, что поле типа телефон */
  isPhone?: boolean;
}

export interface IEditCells<T> {
  /** Компонент для редактирования Аватара */
  avatar: FunctionComponent<T>;
  /** Компонент для редактирования Фамилии */
  last_name: FunctionComponent<T>;
  /** Компонент для редактирования Имени */
  first_name: FunctionComponent<T>;
  /** Компонент для редактирования Отчества */
  middle_name: FunctionComponent<T>;
  /** Компонент для редактирования Даты регистрации */
  registration_date: FunctionComponent<T>;
  /** Компонент для редактирования Телефона */
  phone: FunctionComponent<T>;
  /** Компонент для редактирования Электроннр=ой почты */
  email: FunctionComponent<T>;
  /** Компонент для редактирования Даты рождения */
  date_of_birth: FunctionComponent<T>;
  /** Компонент для редактирования Возраста */
  age: FunctionComponent<T>;
  /** Компонент для редактирования Пола */
  sex: FunctionComponent<T>;

  [index: string]: FunctionComponent<T>;
}
