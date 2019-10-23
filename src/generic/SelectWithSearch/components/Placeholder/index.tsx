import { Typography } from '@material-ui/core';
import React, { FC, memo } from 'react';
import { IProps } from './types';

/**
 * Подписи на селекте
 * @param {Props<ISelectItem>} selectProps пропсы селекта
 * @param {{[p: string]: any}} innerProps внутренние пропсы
 * @param {React.ReactElement<any, string | React.JSXElementConstructor<any>>} children дочерние
 * компоненты
 * @returns {JSX.Element}
 * @constructor
 */
const PlaceHolder: FC<IProps> =
  ({ selectProps, innerProps = {}, children }: IProps): JSX.Element => (
    <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
      {children}
    </Typography>
  );

export default memo<IProps>(PlaceHolder);
