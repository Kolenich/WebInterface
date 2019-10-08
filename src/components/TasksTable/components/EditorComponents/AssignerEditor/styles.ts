import { Theme } from '@material-ui/core';
import { createStyles, StyleRules } from '@material-ui/styles';

const styles = (theme: Theme): StyleRules => createStyles<string, {}>({
  sexSelect: {
    margin: theme.spacing(2),
  },
  inputLabel: {
    marginLeft: theme.spacing(2),
  },
});

export default styles;
