import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { ValueType } from 'react-select/src/types';
import { ISelectItem } from '../Select/types';
import Control from './components/Control';
import Menu from './components/Menu';
import NoOptionsMessage from './components/NoOptionsMessage';
import Option from './components/Option';
import Placeholder from './components/Placeholder';
import SingleValue from './components/SingleValue';
import ValueContainer from './components/ValueContainer';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

const components = {
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
 * @param options список для выбора
 * @param label ярлык селекта
 * @param value текущее значение
 * @param onChange колбэк, возвращающий данные
 */
export default ({ options, label, onChange, value }: IProps): JSX.Element => {
  const classes = useStyles();

  const [option, setOption] = useState<ValueType<ISelectItem>>(null);

  /**
   * Функция, которая устанавливает значение в селект
   */
  const setSelectOption = (): void => {
    const option: ValueType<ISelectItem> =
      options.find((x: ISelectItem) => x.value === value);
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
  const noOptionsMessage = (): string => 'Совпадений не найдено';

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
