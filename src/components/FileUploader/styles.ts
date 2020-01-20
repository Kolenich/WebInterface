import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

/**
 * Стили Material UI
 * @param theme {Theme} тема Material UI
 * @returns {*} CSS классы
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
