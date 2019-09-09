import { WithStyles } from '@material-ui/styles';
import { RouteComponentProps } from 'react-router-dom';
import { styles } from './styles';

export interface IProps extends WithStyles<typeof styles>, RouteComponentProps {
}
