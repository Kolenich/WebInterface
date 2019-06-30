export interface IValidationMethods {
  /** Функция валидации телефона */
  phone: (value: string) => boolean;
  /** Функция валидации электронной почты */
  email: (value: string) => boolean;
  /** Функция валидации латиницы */
  latin: (value: string) => boolean;
  /** Функция валидации кириллицы */
  cyrillic: (value: string) => boolean;

  [index: string]: (value: string) => boolean;
}

export interface IValidationMessages {
  /** Сообщение об ошибке валидации телефона */
  phone: string;
  /** Сообщение об ошибке валидации электронной почты */
  email: string;
  /** Сообщение об ошибке валидации латиницы */
  latin: string;
  /** Сообщение об ошибке валидации кириллицы */
  cyrillic: string;

  [index: string]: string;
}

const emailRegexp: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9а-яА-Яё]+\.[a-zA-Z0-9а-яА-Яё]{2,3}$/;
const phoneRegexp: RegExp = /^8[49]{1}\d{9}$/;
const latin: RegExp = /^[a-zA-Z -]+$/;
const cyrillic: RegExp = /^[а-яА-Яё -]+$/;

/**
 * Функция валидации электронной почты
 * @param value электроная почта
 */
function validateEmail(value: string): boolean {
  return emailRegexp.test(value);
}

/**
 * Функция валидации телефона
 * @param value телефон
 */
function validatePhone(value: string): boolean {
  return phoneRegexp.test(value);
}

/**
 * Функция валидации латиницы
 * @param value строка
 */
function validateLatin(value: string): boolean {
  return latin.test(value);
}

/**
 * Функция валидации кириллицы
 * @param value строка
 */
function validateCyrillic(value: string): boolean {
  return cyrillic.test(value);
}

export const validationMethods: IValidationMethods = {
  phone: validatePhone,
  email: validateEmail,
  latin: validateLatin,
  cyrillic: validateCyrillic,
};

export const validationMessages: IValidationMessages = {
  latin: 'Только латицина',
  cyrillic: 'Только кириллица',
  phone: 'Неверный формат телефона',
  email: 'Неверный формат email\'а',
};

export type Validation = 'latin' | 'cyrillic' | 'phone' | 'email';
