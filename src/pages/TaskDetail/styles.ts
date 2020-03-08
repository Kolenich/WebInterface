import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { APPBAR_HEIGHT } from 'lib/constants';

/**
 * Стили Material UI
 * @param {Theme} theme тема Material UI
 * @return {StyleRules<{}, string>} CSS-классы
 */
const styles = (theme: Theme) => createStyles({
  paper: {
    minHeight: window.innerHeight - APPBAR_HEIGHT,
    padding: theme.spacing(1),
  },
  container: {
    padding: theme.spacing(1),
  },
});

export default styles;
