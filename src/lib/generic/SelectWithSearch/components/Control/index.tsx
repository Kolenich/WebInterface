import { TextField } from '@material-ui/core';
import { ISelectItem } from 'lib/generic/Select/types';
import React from 'react';
import { ControlProps } from 'react-select/src/components/Control';
import InputComponent from '../InputComponent';

/**
 * Компонент текстового поля в селекте
 * @param children дочерние компоненты
 * @param innerProps внутренние пропсы
 * @param innerRef внутренняя ссылка DOM
 * @param selectProps пропсы селекта
 */
export default ({ children, innerProps, innerRef, selectProps }: ControlProps<ISelectItem>):
  JSX.Element => {
  const { classes, TextFieldProps } = selectProps;
  return (
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
};
