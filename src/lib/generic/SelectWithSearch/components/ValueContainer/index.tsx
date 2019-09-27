import { ISelectItem } from 'lib/generic/Select/types';
import React from 'react';
import { ValueContainerProps } from 'react-select/src/components/containers';

/**
 * Компонент контейнера со знаечнием селекта
 * @param selectProps пропсы селекта
 * @param children дочерние компоненты
 */
export default ({ selectProps, children }: ValueContainerProps<ISelectItem>): JSX.Element => (
  <div className={selectProps.classes.valueContainer}>{children}</div>
);
