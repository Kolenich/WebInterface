import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) => createStyles({
  paperRoot: {
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(1),
    width: 120,
  },
  tabContainer: {
    paddingBottom: theme.spacing(1),
  },
});
