import { FormControl, Input, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { ISelectItem } from '../../../../lib/generic/Select/types';
import { ISelectElement } from '../../../../lib/types';
import { sexChoices } from '../../../../lib/utils';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент фильтрации по полу
 * @param props базовые пропсы
 */
const SexEditorComponent: FunctionComponent<IProps> = (props: IProps) => {
  const { onValueChange, value } = props;
  const classes = useStyles();
  const onChange = (event: ChangeEvent<ISelectElement>) => {
    const { value } = event.target;
    onValueChange(value);
  };
  return (
    <FormControl fullWidth>
      <InputLabel className={classes.inputLabel}>
        Фильтр...
      </InputLabel>
      <Select
        className={classes.sexSelect}
        value={value}
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

export default SexEditorComponent;
