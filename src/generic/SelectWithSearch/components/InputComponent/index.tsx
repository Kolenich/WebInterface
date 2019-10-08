import React, { FC } from 'react';
import { IProps } from './types';

/**
 * Комопнент ввода в селекте
 * @param inputRef сслыка в DOM
 * @param props остальные пропсы
 */
const InputComponent: FC<IProps> = ({ inputRef, ...props }: IProps): JSX.Element => (
  <div ref={inputRef} {...props} />
);

export default InputComponent;
