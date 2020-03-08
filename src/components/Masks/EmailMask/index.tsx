import React, { FC } from 'react';
import MaskedInput from 'react-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';
import { IProps } from '../types';

/**
 * Маска для поля с электронной почтой
 * @param {(ref: (HTMLElement | null)) => void} inputRef функция для привязки DOM-элемента
 * @param {Partial<IProps>} props остальные пропсы
 * @returns {JSX.Element}
 * @constructor
 */
const EmailMask: FC<IProps> = ({ inputRef, ...props }: IProps) => (
  <MaskedInput
    {...props}
    ref={ref => inputRef(ref ? ref.inputElement : null)}
    mask={emailMask}
    showMask
  />
);

export default EmailMask;
