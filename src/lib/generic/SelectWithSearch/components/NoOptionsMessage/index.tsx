import { Typography } from '@material-ui/core';
import { ISelectItem } from 'lib/generic/Select/types';
import React from 'react';
import { NoticeProps } from 'react-select/src/components/Menu';

/**
 * Компонент отображения сообщения "Данных нет"
 * @param selectProps пропсы селекта
 * @param children дочерние компонеты
 * @param innerProps внутренние пропсы
 */
export default ({ selectProps, children, innerProps }: NoticeProps<ISelectItem>): JSX.Element => (
  <Typography
    color="primary"
    className={selectProps.classes.noOptionsMessage}
    {...innerProps}
  >
    {children}
  </Typography>
);
