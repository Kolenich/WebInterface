import { FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ISelectItem } from 'lib/generic/Select/types';
import { ISelectElement } from 'lib/types';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { booleanItems } from '../../../settings';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент фильтрации по булевскому значению
 * @param onValueChange функция для обработки изменений
 * @param value текущее значение
 */
const BooleanEditor: FunctionComponent<IProps> = ({ onValueChange, value }: IProps):
  JSX.Element => {
  const classes = useStyles();

  const onChange = (event: ChangeEvent<ISelectElement>): void => onValueChange(event.target.value);

  let displayValue: string = '';
  if (value) {
    displayValue = value;
  }

  return (
    <FormControl fullWidth>
      <InputLabel className={classes.inputLabel}>
        Фильтр...
      </InputLabel>
      <Select
        className={classes.sexSelect}
        value={displayValue}
        input={<Input />}
        onChange={onChange}
      >
        <MenuItem value=""><em>Сброс</em></MenuItem>
        {booleanItems.map(({ label, ...choice }: ISelectItem) => (
          <MenuItem {...choice}>{label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BooleanEditor;
