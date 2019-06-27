import { createStyles, Theme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const styles = (theme: Theme) => createStyles({
  paperMain: {
    padding: theme.spacing(1),
    backgroundColor: grey[50],
  },
});
