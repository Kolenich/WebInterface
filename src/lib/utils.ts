import { EmployeeLabels, SexLabels } from './types';

// Опции для форматирования даты
export const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
};

// Опции для форматирования даты и времени
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

// Ярлыки для объекта Employee
export const employeeLabels: EmployeeLabels = {
  first_name: 'Имя',
  last_name: 'Фамилия',
  middle_name: 'Отчество',
  phone: 'Телефон',
  email: 'Электронная почта',
  date_of_birth: 'Дата рождения',
  sex: 'Пол',
};

// Сообщения статусов
export const UPDATE_SUCCESS: string = 'Сохранение прошло успешно!';
export const SAVE_SUCCESS: string = 'Создание прошло успешно!';
export const DELETE_SUCCESS: string = 'Удаление прошло успешно';
export const SERVER_ERROR: string = 'Ошибка на сервере';
