import { BaseTextFieldProps } from '@material-ui/core/TextField';
import { HTMLAttributes } from 'react';

export type InputComponentProps =
  Pick<BaseTextFieldProps, 'inputRef'>
  & HTMLAttributes<HTMLDivElement>;
