import React, { FC, memo } from 'react';
import { IProps } from './types';

/**
 * Компонент ввода в селекте
 * @param {((instance: (any | null)) => void) | React.RefObject<any> | null | undefined} inputRef
 * ссылка в DOM
 * @param {IProps} props остальные пропсы
 * @returns {JSX.Element}
 * @constructor
 */
const InputComponent: FC<IProps> = ({ inputRef, ...props }: IProps) => (
  <div ref={inputRef} {...props} />
);

export default memo(InputComponent);
