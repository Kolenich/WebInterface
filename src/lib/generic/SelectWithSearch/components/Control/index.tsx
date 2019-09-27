import { TextField } from '@material-ui/core';
import React, { FC } from 'react';
import InputComponent from '../InputComponent';
import { IProps } from './types';

/**
 * Компонент текстового поля в селекте
 * @param children дочерние компоненты
 * @param innerProps внутренние пропсы
 * @param innerRef внутренняя ссылка DOM
 * @param selectProps пропсы селекта
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
