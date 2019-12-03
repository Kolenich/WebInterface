import { Link, LinkBaseProps, Typography, TypographyProps } from '@material-ui/core';
import React, { FC, memo } from 'react';
import { IProps } from './types';

/**
 * Форматтер для вложения
 * @param {any} value значение
 * @returns {JSX.Element}
 * @constructor
 */
const AttachmentFormatter: FC<IProps> = ({ value }: IProps) => {
  const Component = value ? Link : Typography;

  let options: Partial<TypographyProps | LinkBaseProps> = { variant: 'body2' };
  if (value) {
    options = { ...options, href: value.file, download: value.file_name };
  }

  return (
    <Component {...options}>
      {value ? value.file_name : 'Нет вложения'}
    </Component>
  );
};

export default memo<IProps>(AttachmentFormatter);
