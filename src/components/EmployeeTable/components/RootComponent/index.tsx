import { Grid } from '@devexpress/dx-react-grid-material-ui';
import React, { FunctionComponent } from 'react';

/**
 * Корневой компонент виртуальной таблицы
 * @param props передаваемые пропсы
 * @constructor
 */
const RootComponent: FunctionComponent<Grid.RootProps> = (props: Grid.RootProps): JSX.Element =>
  <Grid.Root {...props} style={{ height: '100%' }} />;

export default RootComponent;
