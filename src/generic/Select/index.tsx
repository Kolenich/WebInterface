import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select as SelectBase,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC, memo, useEffect, useRef, useState } from 'react';
import styles from './styles';
import { IProps, ISelectItem } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент селекта
 * @param {(event: React.ChangeEvent<ISelectElement>) => void} handleChange функция,
 * отвечающая за изменение значения селекта
 * @param {ISelectItem[]} items список выбора селекта
 * @param {never} value текущее значение селекта
 * @param {string} label ярлык селекта
 * @param {boolean | undefined} required пометка обязательного поля
 * @returns {JSX.Element}
 * @constructor
 */
const Select: FC<IProps> = ({ handleChange, items, value, label, required }: IProps) => {
  const classes = useStyles();

  const inputLabel = useRef<HTMLLabelElement>(null);

  const [labelWidth, setLabelWidth] = useState<number>(0);

  /**
   * Функция установки ширины разреза в контуре поля для ярлыка
   */
  const setInitialLabelWidth = () => {
    if (inputLabel.current) {
      setLabelWidth(inputLabel.current.offsetWidth);
    }
  };

  useEffect(setInitialLabelWidth, []);

  return (
    <FormControl variant="outlined" className={classes.formControl} required={required}>
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

export default memo<IProps>(Select);
