import { TableEditRow } from '@devexpress/dx-react-grid';
import { FunctionComponent } from 'react';

export interface IProps extends TableEditRow.CellProps {
  /** Флаг "только на чтение" */
  disabled?: boolean;
}

export interface IEditCells<IProps> {
  /** Компонент для редактирования Аватара */
  avatar: FunctionComponent<IProps>;
  /** Компонент для редактирования Фамилии */
  last_name: FunctionComponent<IProps>;
  /** Компонент для редактирования Имени */
  first_name: FunctionComponent<IProps>;
  /** Компонент для редактирования Отчества */
  middle_name: FunctionComponent<IProps>;
  /** Компонент для редактирования Даты регистрации */
  registration_date: FunctionComponent<IProps>;
  /** Компонент для редактирования Телефона */
  phone: FunctionComponent<IProps>;
  /** Компонент для редактирования Электроннр=ой почты */
  email: FunctionComponent<IProps>;
  /** Компонент для редактирования Даты рождения */
  date_of_birth: FunctionComponent<IProps>;
  /** Компонент для редактирования Возраста */
  age: FunctionComponent<IProps>;
  /** Компонент для редактирования Пола */
  sex: FunctionComponent<IProps>;

  [index: string]: FunctionComponent<IProps>;
}
