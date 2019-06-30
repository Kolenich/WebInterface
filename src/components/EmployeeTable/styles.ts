import { Theme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) => createStyles({
  addIcon: {
    margin: theme.spacing(1),
  },
  rowCursor: {
    cursor: 'pointer',
  },
  paper: {
    backgroundColor: grey[50],
  },
  sexSelect: {
    marginBottom: theme.spacing(2),
  },
});
