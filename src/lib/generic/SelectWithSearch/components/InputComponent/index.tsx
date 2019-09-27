import React from 'react';
import { InputComponentProps } from './types';

/**
 * Комопнент ввода в селекте
 * @param inputRef сслыка в DOM
 * @param props остальные пропсы
 */
export default ({ inputRef, ...props }: InputComponentProps): JSX.Element => (
  <div ref={inputRef} {...props} />
);
