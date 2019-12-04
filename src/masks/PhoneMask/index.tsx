import React, { FC, memo } from 'react';
import MaskedInput, { maskArray } from 'react-text-mask';
import { IProps } from '../types';

/** Маска для номера телефона */
const phoneMask: maskArray =
  ['+', '7', '(', /[49]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

/**
 * Маска для поля с электронной почтой
 * @param {(ref: (HTMLElement | null)) => void} inputRef функция для привязки DOM-элемента
 * @param {Partial<IProps} props остальные пропсы
 * @returns {JSX.Element}
 * @constructor
 */
export const PhoneMask: FC<IProps> = ({ inputRef, ...props }: IProps) => (
  <MaskedInput
    {...props}
    ref={ref => inputRef(ref
      ? ref.inputElement
      : null)}
    mask={phoneMask}
    showMask={false}
  />
);

export default memo(PhoneMask);
