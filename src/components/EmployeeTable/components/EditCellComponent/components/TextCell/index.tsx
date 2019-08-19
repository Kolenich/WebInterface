import { TableCell, TextField } from '@material-ui/core';
import { InputProps as StandardInputProps } from '@material-ui/core/Input';
import { EmailMask, PhoneMask } from 'lib/masks';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { IProps } from '../../types';

/**
 * Компонент фильтрации текстовых значений
 * @param onValueChange функция изменения текстового поля
 * @param value значение в тексовом поле
 * @param column объект столбца
 * @param readOnly флаг "только на чтение"
 * @returns {*}
 * @constructor
 */
const TextCell: FunctionComponent<IProps> =
  ({ onValueChange, value, column, disabled, isEmail, isPhone }: IProps): JSX.Element => {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      onValueChange(event.target.value);
    };
    let displayValue = '';
    if (value) {
      displayValue = value;
    }
    const InputProps: Partial<StandardInputProps> = {};
    if (isEmail) {
      InputProps.inputComponent = EmailMask as FunctionComponent;
    }
    if (isPhone) {
      InputProps.inputComponent = PhoneMask as FunctionComponent;
    }
    return (
      <TableCell>
        <TextField
          InputProps={InputProps}
          disabled={disabled}
          label={column.title}
          value={displayValue}
          onChange={onChange}
          fullWidth
        />
      </TableCell>
    );
  };

export default TextCell;
