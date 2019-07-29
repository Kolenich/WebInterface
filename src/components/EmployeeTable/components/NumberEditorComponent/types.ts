import { DataTypeProvider } from '@devexpress/dx-react-grid';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IProps extends DataTypeProvider.ValueEditorProps, WithStyles<typeof styles> {

}
