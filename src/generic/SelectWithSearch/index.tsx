import { makeStyles } from '@material-ui/styles';
import React, { FC, useEffect, useState } from 'react';
import Select from 'react-select';
import { SelectComponentsConfig } from 'react-select/src/components';
import { ValueType } from 'react-select/src/types';
import { ISelectItem } from '../Select/types';
import Control from './components/Control';
import Menu from './components/Menu';
import NoOptionsMessage from './components/NoOptionsMessage';
import Option from './components/Option';
import Placeholder from './components/Placeholder';
import SingleValue from './components/SingleValue';
import ValueContainer from './components/ValueContainer';
import styles from './styles';
import { IInputValue, IProps } from './types';

const useStyles = makeStyles(styles);

const components: SelectComponentsConfig<ISelectItem> = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

/**
 * Компонент выбора с поиском
 * @param {ISelectItem[]} options список для выбора
 * @param {string} label ярлык селекта
 * @param {(option: ValueType<ISelectItem>) => void} onChange текущее значение
 * @param {string | number} value колбэк, возвращающий данные
 * @returns {JSX.Element}
 * @constructor
 */
const SelectWithSearch: FC<IProps> = ({ options, label, onChange, value }: IProps): JSX.Element => {
  const classes = useStyles();

  const [option, setOption] = useState<ValueType<ISelectItem>>(null);

  /**
   * Функция, которая устанавливает значение в селект
   */
  const setSelectOption = (): void => {
    const option: ValueType<ISelectItem> =
      options.find((x: ISelectItem): boolean => x.value === value);
    if (!option) {
      setOption(null);
    } else {
      setOption(option);
    }
  };

  useEffect(setSelectOption, [value]);

  /**
   * Функция сообщения для пустого селекта
   */
  const noOptionsMessage = ({ inputValue }: IInputValue): string => {
    if (options.length) {
      return `Совпадений с ${inputValue} не найдено`;
    }
    return 'Данные отсутствуют';
  };

  return (
    <Select
      classes={classes}
      components={components}
      placeholder="Выберите вариант..."
      value={option}
      onChange={onChange}
      noOptionsMessage={noOptionsMessage}
      options={options}
      TextFieldProps={{
        label,
        InputLabelProps: {
          htmlFor: 'react-select-single',
          shrink: true,
        },
      }}
    />
  );
};

export default SelectWithSearch;
