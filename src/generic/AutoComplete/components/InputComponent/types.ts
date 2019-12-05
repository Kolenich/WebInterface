import { BaseTextFieldProps } from '@material-ui/core/TextField';
import { HTMLAttributes } from 'react';

export type IProps = Pick<BaseTextFieldProps, 'inputRef'> & HTMLAttributes<HTMLDivElement>;
