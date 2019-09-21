import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/styles';

export const styles = (theme: Theme): StyleRules => createStyles<string, {}>({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(16),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 500,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
                                                                    circularProgress: {
                                                                      marginLeft: theme.spacing(1),
                                                                    },
});
