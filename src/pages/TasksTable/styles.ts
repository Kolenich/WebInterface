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
    height: window.innerHeight - APPBAR_HEIGHT,
  },
});

export default styles;
