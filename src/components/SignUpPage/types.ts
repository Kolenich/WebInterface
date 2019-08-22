import { IVariantIcons } from 'lib/generic/Snackbar/types';
import { RouteComponentProps } from 'react-router-dom';

export interface IProps extends RouteComponentProps {
}

export type ISnackbarVariant = keyof IVariantIcons;
