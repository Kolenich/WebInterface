import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

const styles = (theme: Theme) => createStyles({
  row: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.grey.A100,
    },
  },
});

export default styles;
