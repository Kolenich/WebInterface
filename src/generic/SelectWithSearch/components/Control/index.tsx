import { TextField } from '@material-ui/core';
import React, { FC } from 'react';
import InputComponent from '../InputComponent';
import { IProps } from './types';

/**
 * Компонент текстового поля в селекте
 * @param {React.ReactElement<any, string | React.JSXElementConstructor<any>>} children дочерние
 * компоненты
 * @param {{onMouseDown: (event: React.MouseEvent<HTMLElement>) => void}} innerProps внутренние
 * пропсы
 * @param {((instance: (any | null)) => void) | React.RefObject<any> | null} innerRef внутренняя
 * ссылка DOM
 * @param {any} classes пропсы селекта
 * @param {any} TextFieldProps
 * @returns {JSX.Element}
 * @constructor
 */
const Control: FC<IProps> = (
  { children, innerProps, innerRef, selectProps: { classes, TextFieldProps } }: IProps,
): JSX.Element => (
  <TextField
    fullWidth
    variant="outlined"
    InputProps={{
      inputComponent: InputComponent,
      inputProps: {
        children,
        className: classes.input,
        ref: innerRef,
        ...innerProps,
      },
    }}
    {...TextFieldProps}
  />
);

export default Control;
