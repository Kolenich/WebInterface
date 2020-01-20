import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { APPBAR_HEIGHT } from 'lib/constants';

const styles = (theme: Theme) => createStyles({
  paper: {
    height: window.innerHeight - APPBAR_HEIGHT,
  },
});

export default styles;
