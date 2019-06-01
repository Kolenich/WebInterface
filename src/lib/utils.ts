// Опции для форматирования даты
import { EmployeeLabels, SexLabels } from './types';

export const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
};

export const dateTimeOptions = {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
};

// Варианты локалей для интернационализации
export type Locales = 'ru' | 'en-US' | 'en-GB' | 'fr';

// Ярлыки для пола
export const sexLabel: SexLabels = {
  male: 'Муж.',
  female: 'Жен.',
};

export const employeeLabel: EmployeeLabels = {
  first_name: 'Имя',
  last_name: 'Фамилия',
  middle_name: 'Отчество',
  phone: 'Телефон',
  email: 'Электронная почта',
  date_of_birth: 'Дата рождения',
  sex: 'Пол',
};
