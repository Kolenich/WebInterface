import { DataTypeProvider, DataTypeProviderProps } from '@devexpress/dx-react-grid';
import { Avatar } from '@material-ui/core';
import React from 'react';
import avatar from '../../assets/default_avatar.png';
import { dateOptions, dateTimeOptions, getFileLoadURL } from '../../lib/utils';

/**
 * Форматтер для даты без времени
 * @param value значение
 * @constructor
 */
export const DateFormatter = ({ value }: DataTypeProvider.ValueFormatterProps) => (
  <>{new Date(value).toLocaleDateString('ru', dateOptions)}</>
);

/**
 * Форматтер для изображений
 * @param value url файла
 * @constructor
 */
export const ImageFormatter = ({ value }: DataTypeProvider.ValueFormatterProps) => {
  if (value !== null) {
    return (
      <Avatar src={`${getFileLoadURL()}${value}`}/>
    );
  }
  return <Avatar src={avatar}/>;
};

/**
 * Форматтер для даты с временем
 * @param value значение
 * @constructor
 */
export const DateTimeFormatter = ({ value }: DataTypeProvider.ValueFormatterProps) => (
  <>{new Date(value).toLocaleDateString('ru', dateTimeOptions)}</>
);

/**
 * Тип данных для ячеек даты без времени
 * @param props свойства ячейки
 * @constructor
 */
export const DateTypeProvider = (props: DataTypeProviderProps) => (
  <DataTypeProvider {...props} formatterComponent={DateFormatter}/>
);

/**
 * Тип данных для ячеек с аватарами
 * @param props свойства ячейки
 * @constructor
 */
export const ImageTypeProvider = (props: DataTypeProviderProps) => (
  <DataTypeProvider {...props} formatterComponent={ImageFormatter}/>
);

/**
 * Тип данных для ячеек даты с временем
 * @param props свойства ячейки
 * @constructor
 */
export const DateTimeTypeProvider = (props: DataTypeProviderProps) => (
  <DataTypeProvider {...props} formatterComponent={DateTimeFormatter}/>
);
