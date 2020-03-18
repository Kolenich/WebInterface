import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

/**
 * Стили Material UI
 * @param {Theme} theme тема Material UI
 * @return {StyleRules<{}, string>} CSS-классы
 */
const styles = (theme: Theme) => createStyles({
  row: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen,
    }),
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.grey.A100,
    },
  },
});

export default styles;
