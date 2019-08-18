import { TableCell, TextField } from '@material-ui/core';
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
  ({ onValueChange, value, column, disabled }: IProps): JSX.Element => {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      onValueChange(event.target.value);
    };
    let displayValue = '';
    if (value) {
      displayValue = value;
    }
    return (
      <TableCell>
        <TextField
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
