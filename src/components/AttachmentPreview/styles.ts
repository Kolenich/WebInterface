import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

/**
 * Стили Material UI
 * @param {Theme} theme тема Material UI
 * @return {StyleRules<{}, string>} CSS-классы
 */
const styles = (theme: Theme) => createStyles({
  preview: {
    '&:hover': {
      color: theme.palette.primary.dark,
      textDecoration: 'none',
    },
  },
});

export default styles;
