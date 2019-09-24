import { Theme } from '@material-ui/core';
import { createStyles, StyleRules } from '@material-ui/styles';
import { appBarHeight } from 'lib/utils';

export const styles = (theme: Theme): StyleRules => createStyles<string, {}>({
  paper: {
    height: window.innerHeight - appBarHeight,
  },
});
