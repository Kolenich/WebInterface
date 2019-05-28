import { ComponentState } from 'react';
import { ButtonProps } from '@material-ui/core/Button';

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

export type Sex = 'male' | 'female' | '';

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

export interface SexLabels {
  male: string;
  female: string;

  [index: string]: string;
}

export interface Attachment {
  file: string;
  file_name: string;
  file_mime: string;
  file_size: number;
}

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

export interface ModalProps {
  open: boolean;
  onClose: () => ComponentState;
}

// Тип иконок для основной кнопки
export type PrimaryButtonIcon = 'save' | 'add' | 'confirm' | 'update' | 'edit';

// Тип иконок для вторичной кнопки
export type SecondaryButtonIcon = 'delete' | 'cancel';

export interface CustomButtonProps extends ButtonProps {
  text: string;
  icon?: PrimaryButtonIcon | SecondaryButtonIcon;
}
