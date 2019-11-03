import { Theme } from '@material-ui/core';
import { createStyles, StyleRules } from '@material-ui/styles';
import { APPBAR_HEIGHT } from 'lib/constants';

const styles = (theme: Theme): StyleRules => createStyles<string, {}>({
  paper: {
    height: window.innerHeight - APPBAR_HEIGHT,
  },
});

export default styles;
