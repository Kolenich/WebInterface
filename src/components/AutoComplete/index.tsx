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

  /**
   * Функция, которая устанавливает значение в селект
   */
  const setSelectOption = () => {
    const option = options.find((x: ISelectItem) => x.value === value);
    if (!option) {
      setOption(null);
    } else {
      setOption(option);
    }
  };

  /**
   * Функция для отображения отсутствия совпадений в выборе
   * @returns {JSX.Element}
   */
  const getNoOptionsText = () => (
    <Typography className={classes.noOptions}>
      {options.length ? 'Совпадений не найдено' : 'Данные отсутствуют'}
    </Typography>
  );

  /**
   * Функция для отображения наименований и поиска по ним
   * @param {ISelectItem} option текущй объект выбора
   * @returns {string}
   */
  const getOptionLabel = (option: ISelectItem) => option.label;

  /**
   * Функция отрисовки поля для ввода
   * @param {AutocompleteRenderInputParams} params входные параметры
   * @returns {JSX.Element}
   */
  const renderInput = (params: AutocompleteRenderInputParams) => (
    <TextField
      {...params}
      label={label}
      variant="outlined"
      fullWidth
      {...textFieldProps}
    />
  );

  useEffect(setSelectOption, [value]);

  return (
    <AutoCompleteBase
      clearText="Очистить"
      noOptionsText={getNoOptionsText()}
      value={option}
      clearOnEscape
      options={options}
      onChange={onChange}
      getOptionLabel={getOptionLabel}
      className={classes.root}
      renderInput={renderInput}
    />
  );
};

export default AutoComplete;
