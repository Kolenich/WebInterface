import React, { FC } from 'react';
import { IProps } from './types';

/**
 * Компонент контейнера со знаечнием селекта
 * @param selectProps пропсы селекта
 * @param children дочерние компоненты
 */
const ValueContainer: FC<IProps> = ({ selectProps, children }: IProps): JSX.Element => (
  <div className={selectProps.classes.valueContainer}>{children}</div>
);

export default ValueContainer;
