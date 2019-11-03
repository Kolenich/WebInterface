import { Theme } from '@material-ui/core';
import { createStyles, StyleRules } from '@material-ui/styles';
import { APPBAR_HEIGHT } from 'lib/constants';

const styles = (theme: Theme): StyleRules => createStyles<string, {}>({
  paper: {
    minHeight: window.innerHeight - APPBAR_HEIGHT,
    padding: theme.spacing(1),
  },
  container: {
    padding: theme.spacing(1),
  },
});

export default styles;
