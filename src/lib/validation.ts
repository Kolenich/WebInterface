export interface ValidationMethods {
  phone: (value: string) => boolean;
  email: (value: string) => boolean;
  latin: (value: string) => boolean;
  cyrillic: (value: string) => boolean;

  [index: string]: (value: string) => boolean;
}

export interface ValidationMessages {
  phone: string;
  email: string;
  latin: string;
  cyrillic: string;

  [index: string]: string;
}

const emailRegexp: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9а-яА-Яё]+\.[a-zA-Z0-9а-яА-Яё]{2,3}$/;
const phoneRegexp: RegExp = /^8[49]{1}\d{9}$/;
const latin: RegExp = /^[a-zA-Z -]+$/;
const cyrillic: RegExp = /^[а-яА-Яё -]+$/;

function validateEmail(value: string): boolean {
  return emailRegexp.test(value);
}

function validatePhone(value: string): boolean {
  return phoneRegexp.test(value);
}

function validateLatin(value: string): boolean {
  return latin.test(value);
}

function validateCyrillic(value: string): boolean {
  return cyrillic.test(value);
}

export const validationMethods: ValidationMethods = {
  phone: validatePhone,
  email: validateEmail,
  latin: validateLatin,
  cyrillic: validateCyrillic,
};

export const validationMessages: ValidationMessages = {
  latin: 'Только латицина',
  cyrillic: 'Только кириллица',
  phone: 'Неверный формат телефона',
  email: 'Неверный формат email\'а',
};

export type Validation = 'latin' | 'cyrillic' | 'phone' | 'email';
