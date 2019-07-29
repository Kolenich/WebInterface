import { TableFilterRow } from '@devexpress/dx-react-grid-material-ui';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IProps extends TableFilterRow.CellProps, WithStyles<typeof styles> {

}
