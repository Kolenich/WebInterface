import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { IProps } from './types';

/**
 * Подписи на селекте
 * @param selectProps пропсы селекта
 * @param innerProps внутренние пропсы
 * @param children дочерние компоненты
 */
const PlaceHolder: FC<IProps> =
  ({ selectProps, innerProps = {}, children }: IProps): JSX.Element => (
    <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
      {children}
    </Typography>
  );

export default PlaceHolder;
