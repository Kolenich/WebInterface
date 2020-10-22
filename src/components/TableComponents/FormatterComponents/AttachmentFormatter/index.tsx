import { Typography } from '@material-ui/core';
import AttachmentPreview from 'components/AttachmentPreview';
import React, { FC } from 'react';
import { IProps } from './types';

/**
 * Форматтер для вложения
 * @param {any} value значение
 * @returns {JSX.Element}
 * @constructor
 */
const AttachmentFormatter: FC<IProps> = ({ value }) => {
  if (value) {
    return (
      <AttachmentPreview attachment={value}/>
    );
  }

  return (
    <Typography variant="body2">
      Нет вложения
    </Typography>
  );
};

export default AttachmentFormatter;
