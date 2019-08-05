import { Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { IProps } from './types';

/**
 * Компонент ячейки для столбцов без фильтрации
 * @param props базовые пропсы
 */
const NoFilterEditorComponent: FunctionComponent<IProps> =
  (props: IProps): JSX.Element => (
    <Typography component="div" />
  );

export default NoFilterEditorComponent;
