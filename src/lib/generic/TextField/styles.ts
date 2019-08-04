import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) => createStyles<string, any>({
  textField: {
    color: theme.palette.text.primary,
    margin: theme.spacing(1),
  },
});
