import { Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент для отображения в таблице числового значения
 * @param props передаваемые пропсы
 * @constructor
 */
const NumberEditor: FunctionComponent<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value: targetValue } = event.target;
    if (targetValue.trim() === '') {
      props.onValueChange(targetValue.trim());
      return;
    }
    props.onValueChange(parseInt(targetValue, 10));
  };
  return (
    <Input
      type="number"
      classes={{ input: classes.numericInput }}
      fullWidth
      value={props.value === undefined
        ?
        ''
        :
        props.value}
      inputProps={{
        min: 0,
        placeholder: 'Фильтр...',
      }}
      onChange={handleChange}
    />
  );
};

export default NumberEditor;
