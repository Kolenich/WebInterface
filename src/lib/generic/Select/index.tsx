import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select as SelectBase,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent, useRef } from 'react';
import { styles } from './styles';
import { IProps, ISelectItem } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент селекта
 * @param classes стили
 * @param xs размер на маленьких экранах
 * @param lg размер на больших экранах
 * @param handleChange функция, отвечающая за изменение значения селекта
 * @param items список выбора селекта
 * @param value текущее значение селекта
 * @param label ярлык селекта
 * @param props остальные пропсы
 * @constructor
 */
const Select: FunctionComponent<IProps> =
  ({ xs, lg, handleChange, items, value, label, ...props }: IProps): JSX.Element => {
    const classes = useStyles();
    const inputLabel = useRef<HTMLLabelElement>(null);
    let labelWidth = 0;
    if (inputLabel.current) {
      labelWidth = inputLabel.current.offsetWidth;
    }
    return (
      <Grid item xs={xs} lg={lg}>
        <FormControl variant="outlined" className={classes.formControl} {...props}>
          <InputLabel ref={inputLabel} htmlFor="sex">{label}</InputLabel>
          <SelectBase
            value={value}
            onChange={handleChange}
            input={<OutlinedInput labelWidth={labelWidth} id="sex" />}>
            {items.map((item: ISelectItem) => (
              <MenuItem value={item.value} key={item.key}>{item.label}</MenuItem>
            ))}
          </SelectBase>
        </FormControl>
      </Grid>
    );
  };

export default Select;
