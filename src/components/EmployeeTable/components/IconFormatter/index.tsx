import { DataTypeProvider } from '@devexpress/dx-react-grid';
import { IconButton, Tooltip } from '@material-ui/core';
import { Create } from '@material-ui/icons';
import React, { FunctionComponent } from 'react';
import { IHandleCLick, IProps } from './types';

/**
 * Компонент для иконок под разные статусы
 */
const IconFormatter =
  (handleClick: IHandleCLick) => (props: DataTypeProvider.ValueFormatterProps): JSX.Element => {
    const { id } = props.row;
    return (
      <Tooltip title="Редактировать">
        <IconButton onClick={handleClick(id)}>
          <Create />
        </IconButton>
      </Tooltip>
    );
  };

/**
 * Компонент, предоставляющий тип для иконок под разные статусы
 */
const IconTypeProvider: FunctionComponent<IProps> =
  ({ handleClick, ...props }: IProps): JSX.Element => (
    <DataTypeProvider
      formatterComponent={IconFormatter(handleClick)}
      {...props}
    />
  );

export default IconTypeProvider;
