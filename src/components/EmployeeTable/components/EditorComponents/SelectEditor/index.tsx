import { FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ISelectItem } from 'lib/generic/Select/types';
import { ISelectElement } from 'lib/types';
import { sexChoices } from 'lib/utils';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент фильтрации по полу
 * @param props базовые пропсы
 */
const SelectEditor: FunctionComponent<IProps> = (props: IProps): JSX.Element => {
  const { onValueChange, value } = props;
  const classes = useStyles();
  const onChange = (event: ChangeEvent<ISelectElement>): void => {
    const { value } = event.target;
    onValueChange(value);
  };
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
        {sexChoices.map((choice: ISelectItem) => (
          <MenuItem key={choice.key} value={choice.value}>{choice.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectEditor;
