import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select as SelectBase,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { styles } from './styles';
import { IProps, ISelectItem } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент селекта
 * @param classes стили
 * @param handleChange функция, отвечающая за изменение значения селекта
 * @param items список выбора селекта
 * @param value текущее значение селекта
 * @param label ярлык селекта
 * @param props остальные пропсы
 * @constructor
 */
const Select: FunctionComponent<IProps> =
  ({ handleChange, items, value, label, ...props }: IProps): JSX.Element => {
    const classes = useStyles();

    const inputLabel = useRef<HTMLLabelElement>(null);

    const [labelWidth, setLabelWidth] = useState<number>(0);

    useEffect(
      () => {
        if (inputLabel.current) {
          setLabelWidth(inputLabel.current.offsetWidth);
        }
      },
      [],
    );

    return (
      <FormControl variant="outlined" className={classes.formControl} {...props}>
        <InputLabel ref={inputLabel} htmlFor="select">{label}</InputLabel>
        <SelectBase
          value={value}
          onChange={handleChange}
          input={<OutlinedInput labelWidth={labelWidth} id="select" />}>
          {items.map(({ label, ...item }: ISelectItem) => (
            <MenuItem {...item}>{label}</MenuItem>
          ))}
        </SelectBase>
      </FormControl>
    );
  };

export default Select;
