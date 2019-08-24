import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ISelectElement } from 'lib/types';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент фильтрации текстовых значений
 * @param props базовые пропсы
 */
const TextEditor: FunctionComponent<IProps> = (props: IProps) => {
  const { onValueChange, value } = props;
  const classes = useStyles();
  const onChange = (event: ChangeEvent<ISelectElement>) => {
    const { value } = event.target;
    onValueChange(value);
  };
  let displayValue: string = '';
  if (value) {
    displayValue = value;
  }
  return (
    <TextField
      label="Фильтр..."
      value={displayValue}
      onChange={onChange}
      fullWidth
      className={classes.textField}
    />
  );
};

export default TextEditor;
