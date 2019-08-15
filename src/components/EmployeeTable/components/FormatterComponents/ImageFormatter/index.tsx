import { DataTypeProvider } from '@devexpress/dx-react-grid';
import { Avatar } from '@material-ui/core';
import React from 'react';
import yoba from '../../../../../assets/img/yoba.jpg';
import { getBaseUrl } from '../../../../../lib/utils';

/**
 * Форматтер для изображений
 * @param value url файла
 * @constructor
 */
const ImageFormatter = ({ value }: DataTypeProvider.ValueFormatterProps) => {
  if (value) {
    return <Avatar src={`${getBaseUrl()}${value}`} />;
  }
  return <Avatar src={yoba} />;
};

export default ImageFormatter;
