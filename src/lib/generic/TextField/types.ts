import { ChangeEvent } from 'react';
import { Validation } from '../../types';

export interface IProps {
  /** Имя поля в объекте */
  name: string;
  /** Значение в текстовом поле */
  fieldValue: string | null;
  /** Указатель обязательного для заполнения поля */
  required?: boolean;
  /** Тип валидации на поле */
  validationType?: Validation;
  /** Ярлык для текстового поля */
  label: string;
  /** Функция для обработки изменения в текстовом поле */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Колбэк, срабатывающий при ошибки валидации в текстомовм поле */
  onError?: () => void;
}
