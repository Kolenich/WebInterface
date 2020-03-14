import { createStyles, Theme } from '@material-ui/core';

/**
 * Стили Material UI
 * @param {Theme} theme тема Material UI
 * @return {StyleRules<{}, string>} CSS-классы
 */
const styles = (theme: Theme) => createStyles({
  snackbarIcon: {
    paddingRight: theme.spacing(1),
  },
});

export default styles;
