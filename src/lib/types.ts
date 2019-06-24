import { ButtonProps } from '@material-ui/core/Button';

// Интерфейс для модели Employee
export interface Employee {
  id?: number;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  phone: string | null;
  age: number;
  email: string;
  date_of_birth: Date | string;
  registration_date: Date | string;
  attachment: Attachment | null;
  organization: number | null;
  sex: Sex;

  [index: string]: string | number | undefined | null | Attachment | boolean | Date | Employee;
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

// Интерфейс для модели Attachment
export interface Attachment {
  file: string;
  file_name: string;
  file_mime: string;
  file_size: number;
}

// Интерфейс для модели Organization
export interface Organization {
  id?: number;
  full_name: string;
  short_name: string;
  registration_date: Date;
  inn: string;
  kpp: string;
  ogrn: string;
  okved_code: string;
  okved_name: string;
  employees: Employee[];
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

export interface PaginationResponse<DataType> {
  count: number;
  next: string;
  previous: string;
  results: DataType[];
}

interface PagingParams {
  limit: number;
  offset: number;
}

export interface DRFGetConfig {
  params: PagingParams;
}
