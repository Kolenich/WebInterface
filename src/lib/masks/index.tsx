import React, { FunctionComponent } from 'react';
import MaskedInput, { maskArray } from 'react-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';
import { IProps } from './types';

/** Маска для номера телефона */
const phoneMask: maskArray =
  ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

/**
 * Маска для поля с электронной почтой
 * @param inputRef функция для привязки DOM-элемента
 * @param props остальные пропсы
 * @returns {*}
 * @constructor
 */
export const EmailMask: FunctionComponent<IProps> =
  ({ inputRef, ...props }: IProps): JSX.Element => (
    <MaskedInput
      {...props}
      ref={ref => inputRef(ref ? ref.inputElement : null)}
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
export const PhoneMask: FunctionComponent<IProps> =
  ({ inputRef, ...props }: IProps): JSX.Element => (
    <MaskedInput
      {...props}
      ref={ref => inputRef(ref ? ref.inputElement : null)}
      mask={phoneMask}
      showMask
    />
  );
