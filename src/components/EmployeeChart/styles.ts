import { Theme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { createStyles, StyleRules } from '@material-ui/styles';

export const styles = (theme: Theme): StyleRules => createStyles<string, {}>({
  paperMain: {
    padding: theme.spacing(1),
    backgroundColor: grey[50],
  },
});
