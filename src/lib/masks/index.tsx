import React, { FC } from 'react';
import MaskedInput, { maskArray } from 'react-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';
import { IProps } from './types';

/** Маска для номера телефона */
const phoneMask: maskArray =
  ['+', '7', '(', /[49]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

/**
 * Маска для поля с электронной почтой
 * @param inputRef функция для привязки DOM-элемента
 * @param props остальные пропсы
 * @returns {*}
 * @constructor
 */
export const EmailMask: FC<IProps> = ({ inputRef, ...props }: IProps): JSX.Element => (
  <MaskedInput
    {...props}
    ref={ref => inputRef(ref
      ? ref.inputElement
      : null)}
    mask={emailMask}
    showMask
  />
);

/**
 * Маска для поля с электронной почтой
 * @param inputRef функция для привязки DOM-элемента
 * @param props остальные пропсы
 * @returns {*}
 * @constructor
 */
export const PhoneMask: FC<IProps> = ({ inputRef, ...props }: IProps): JSX.Element => (
  <MaskedInput
    {...props}
    ref={ref => inputRef(ref
      ? ref.inputElement
      : null)}
    mask={phoneMask}
    showMask={false}
  />
);
