import { createStyles, Theme } from '@material-ui/core';

/**
 * Стили Material UI
 * @param {Theme} theme тема Material UI
 * @return {StyleRules<{}, string>} CSS-классы
 */
const styles = (theme: Theme) => createStyles({
  datePicker: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
});

export default styles;
