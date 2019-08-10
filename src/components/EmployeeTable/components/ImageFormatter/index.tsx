import { DataTypeProvider, DataTypeProviderProps } from '@devexpress/dx-react-grid';
import { Avatar } from '@material-ui/core';
import React from 'react';
import yoba from '../../../../assets/img/yoba.jpg';
import { getBaseUrl } from '../../../../lib/utils';

/**
 * Форматтер для изображений
 * @param value url файла
 * @constructor
 */
const ImageFormatter = ({ value }: DataTypeProvider.ValueFormatterProps) => {
  if (value !== null) {
    return <Avatar src={`${getBaseUrl()}${value}`} />;
  }
  return (
    <Avatar src={yoba} />
  );
};

/**
 * Тип данных для ячеек с аватарами
 * @param props свойства ячейки
 * @constructor
 */
const ImageTypeProvider = (props: DataTypeProviderProps) => (
  <DataTypeProvider {...props} formatterComponent={ImageFormatter} />
);

export default ImageTypeProvider;
