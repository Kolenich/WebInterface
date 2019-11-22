import { MenuItem, TextField } from '@material-ui/core';
import React, { FC, memo } from 'react';
import { IProps, ISelectItem } from './types';

/**
 * Компонент селекта
 * @param {ISelectItem[]} items набор опций
 * @param {OutlinedTextFieldProps} props остальные пропсы
 * @returns {JSX.Element}
 */
const Select: FC<IProps> = ({ items, ...props }: IProps) => (
  <TextField
    select
    fullWidth
    {...props}
  >
    <MenuItem value=""><em>Сброс</em></MenuItem>
    {items.map(({ label, ...item }: ISelectItem) => (
      <MenuItem {...item}>{label}</MenuItem>
    ))}
  </TextField>
);

export default memo<IProps>(Select);
