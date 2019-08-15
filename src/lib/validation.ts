import { IValidationFunction, IValidationMessages, IValidationMethods } from './types';

const emailRegexp: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9а-яА-ЯЁё]+\.[a-zA-Z0-9а-яА-Яё]{2,3}$/;
const phoneRegexp: RegExp = /^8[49]{1}\d{9}$/;
const latin: RegExp = /^[a-zA-Z -]+$/;
const cyrillic: RegExp = /^[а-яА-ЯЁё -]+$/;

/**
 * Функция валидации электронной почты
 * @param value электроная почта
 */
const validateEmail: IValidationFunction = (value: string): boolean => emailRegexp.test(value);

/**
 * Функция валидации телефона
 * @param value телефон
 */
const validatePhone: IValidationFunction = (value: string): boolean => phoneRegexp.test(value);

/**
 * Функция валидации латиницы
 * @param value строка
 */
const validateLatin: IValidationFunction = (value: string): boolean => latin.test(value);

/**
 * Функция валидации кириллицы
 * @param value строка
 */
const validateCyrillic: IValidationFunction = (value: string): boolean => cyrillic.test(value);

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
