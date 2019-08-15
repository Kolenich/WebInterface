import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

export const styles = (theme: Theme) => createStyles<string, {}>({
  button: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
});
