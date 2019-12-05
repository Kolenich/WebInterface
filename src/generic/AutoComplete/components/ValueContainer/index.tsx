import React, { FC, memo } from 'react';
import { IProps } from './types';

/**
 * Компонент контейнера со знаечнием селекта
 * @param {Props<ISelectItem>} selectProps пропсы селекта
 * @param {React.ReactElement<any, string | React.JSXElementConstructor<any>>} children дочерние
 * компоненты
 * @returns {JSX.Element}
 * @constructor
 */
const ValueContainer: FC<IProps> = ({ selectProps, children }: IProps) => (
  <div className={selectProps.classes.valueContainer}>{children}</div>
);

export default memo(ValueContainer);
