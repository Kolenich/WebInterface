import { Theme } from '@material-ui/core';
import { createStyles, StyleRules } from '@material-ui/styles';
import { appBarHeight } from 'lib/utils';

export const styles = (theme: Theme): StyleRules => createStyles<string, {}>({
  paper: {
    height: window.innerHeight - appBarHeight - theme.spacing(2),
    margin: theme.spacing(1),
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(1),
    left: theme.spacing(1),
  },
});
