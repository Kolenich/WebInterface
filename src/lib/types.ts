import { ButtonProps } from '@material-ui/core/Button';

// Интерфейс для модели Employee
export interface Employee {
  id?: number;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  phone: string | null;
  age?: number;
  email: string;
  date_of_birth: Date | string;
  registration_date: Date | string;
  sex: Sex;

  [index: string]: string | number | undefined | null | boolean | Date | Employee;
}

// Интерфейс для строки в таблице Employees
export interface TableRow {
  id: number;
  full_name: string;
  phone: string | null;
  age: number;
  email: string;
  date_of_birth: Date | string;
  registration_date: Date | string;
  sex: string;
}

// Тип для пола
export type Sex = 'male' | 'female' | '';

// Ярлыки для объекта Employee
export interface EmployeeLabels {
  first_name: string;
  last_name: string;
  middle_name: string;
  phone: string;
  email: string;
  date_of_birth: string;
  sex: string;

  [index: string]: string;
}

// Интерфейс для ярлыков пола
export interface SexLabels {
  male: string;
  female: string;

  [index: string]: string;
}

// Тип иконок для основной кнопки
export type PrimaryButtonIcon = 'save' | 'add' | 'confirm' | 'update' | 'edit';

// Тип иконок для вторичной кнопки
export type SecondaryButtonIcon = 'delete' | 'cancel';

export interface CustomButtonProps extends ButtonProps {
  text: string;
  icon?: PrimaryButtonIcon | SecondaryButtonIcon;
}

export type HTTPMethods = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface ApiResponse<DataType> {
  count: number;
  next: string;
  previous: string;
  results: DataType[];
}

export interface DRFGetConfig {
  params: any;
}

export interface Sorting {
  asc: string;
  desc: string;
}

// Варианты локалей для интернационализации
export type Locales = 'ru' | 'en-US' | 'en-GB' | 'fr';
