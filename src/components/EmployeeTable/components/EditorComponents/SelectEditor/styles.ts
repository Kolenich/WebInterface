import { createStyles, Theme } from '@material-ui/core';

export const styles = (theme: Theme) => createStyles<string, any>({
  sexSelect: {
    margin: theme.spacing(2),
  },
  inputLabel: {
    marginLeft: theme.spacing(2),
  },
});
