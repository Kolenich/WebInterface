import { TextField, Typography } from '@material-ui/core';
import { Autocomplete as AutoCompleteBase } from '@material-ui/lab';
import { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete/Autocomplete';
import { makeStyles } from '@material-ui/styles';
import React, { FC, useEffect, useState } from 'react';
import { ISelectItem } from '../Select/types';
import styles from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент выбора с поиском
 * @param {ISelectItem[]} options - список для выбора
 * @param {string} label - ярлык селекта
 * @param {(event: React.ChangeEvent<{}>, option: (ISelectItem | null)) => void} onChange - колбэк,
 * возвращающий данные
 * @param {string | number | null} value - текущее значение
 * @param {Partial<OutlinedTextFieldProps>} textFieldProps - пропсы текстового поля
 * @return {JSX.Element}
 * @constructor
 */
const AutoComplete: FC<IProps> = ({ options, label, onChange, value, textFieldProps }) => {
  const classes = useStyles();

  const [option, setOption] = useState<ISelectItem | null>(null);

  useEffect(() => {
    setOption(options.find((x: ISelectItem) => x.value === value) || null);
  }, [value, options]);

  return (
    <AutoCompleteBase
      clearText="Очистить"
      noOptionsText={(
        <Typography className={classes.noOptions}>
          {options.length ? 'Совпадений не найдено' : 'Данные отсутствуют'}
        </Typography>
      )}
      value={option}
      clearOnEscape
      options={options}
      onChange={onChange}
      getOptionLabel={(opt: ISelectItem) => opt.label}
      className={classes.root}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          fullWidth
          {...textFieldProps}
        />
      )}
    />
  );
};

export default AutoComplete;
