import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

export const styles = (theme: Theme) => createStyles({
  addIcon: {
    margin: theme.spacing.unit,
  },
  rowCursor: {
    cursor: 'pointer',
  },
  paper: {
    backgroundColor: grey[50],
  },
});
