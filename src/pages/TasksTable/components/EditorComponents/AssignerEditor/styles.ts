import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

const styles = (theme: Theme) => createStyles({
  sexSelect: {
    margin: theme.spacing(2),
  },
  inputLabel: {
    marginLeft: theme.spacing(2),
  },
});

export default styles;