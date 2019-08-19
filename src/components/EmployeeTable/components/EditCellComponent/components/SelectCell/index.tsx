import { FormControl, Input, InputLabel, MenuItem, Select, TableCell } from '@material-ui/core';
import { ISelectEvent } from 'lib/types';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { IProps } from '../../types';
import { ISexChoice } from './types';

const SEX_CHOICES: ISexChoice[] = [
  { key: 1, value: 'male', label: 'Мужской' },
  { key: 2, value: 'female', label: 'Женский' },
];

/**
 * Компонент выбора по определенным значениям
 * @param onValueChange функция изменения значения
 * @param value текущее значение
 * @param readOnly флаг "только на чтение"
 * @returns {*}
 * @constructor
 */
const SelectCell: FunctionComponent<IProps> =
  ({ onValueChange, value, disabled }: IProps): JSX.Element => {
    const handleChange = (event: ChangeEvent<ISelectEvent>) => {
      onValueChange(event.target.value);
    };
    let displayValue: string = '';
    if (value) {
      displayValue = value;
    }
    return (
      <TableCell>
        <FormControl fullWidth disabled={disabled}>
          <InputLabel>Выберите...</InputLabel>
          <Select
            value={displayValue}
            input={<Input />}
            onChange={handleChange}
          >
            {SEX_CHOICES.map(({ label, ...choice }: ISexChoice) => (
              <MenuItem {...choice}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
    );
  };

export default SelectCell;
