import { Theme } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) => createStyles({
  paperRoot: {
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
  },
  typographyRoot: {
    padding: theme.spacing.unit,
    backgroundColor: indigo[300],
    textColor: 'white',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 120,
  },
  tabContainer: {
    paddingBottom: theme.spacing.unit,
  },
});
