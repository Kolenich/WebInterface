import { Theme } from '@material-ui/core';
import indigo from '@material-ui/core/colors/indigo';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  paperRoot: {
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    height: 1000,
  },
  typographyRoot: {
    padding: theme.spacing.unit,
    backgroundColor: indigo[300],
    textColor: 'white',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});
