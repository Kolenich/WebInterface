import { Link, Typography } from '@material-ui/core';
import { LinkBaseProps } from '@material-ui/core/Link';
import { TypographyProps } from '@material-ui/core/Typography';
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
    options = {
      ...options,
      href: value.file,
      target: '_blank',
      rel: 'noreferrer noreferer',
    };
  }

  return (
    <Component {...options}>
      {value ? value.file_name : 'Нет вложения'}
    </Component>
  );
};

export default memo(AttachmentFormatter);
