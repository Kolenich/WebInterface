import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

export const styles = (theme: Theme) => createStyles<string, {}>({
  textField: {
    color: theme.palette.text.primary,
    margin: theme.spacing(1),
  },
});
