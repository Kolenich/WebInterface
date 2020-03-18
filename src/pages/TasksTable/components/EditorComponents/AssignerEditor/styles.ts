import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

/**
 * Стили Material UI
 * @param {Theme} theme тема Material UI
 * @return {StyleRules<{}, string>} CSS-классы
 */
const styles = (theme: Theme) => createStyles({
  select: {
    marginBottom: theme.spacing(2),
  },
});

export default styles;
