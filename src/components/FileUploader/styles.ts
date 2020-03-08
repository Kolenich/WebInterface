import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

/**
 * Стили Material UI
 * @param {Theme} theme тема Material UI
 * @return {StyleRules<{}, string>} CSS-классы
 */
const styles = (theme: Theme) => createStyles({
  hint: {
    textTransform: 'lowercase',
    fontSize: 14,
    padding: theme.spacing(1),
    fontWeight: 'bold',
  },
});

export default styles;
