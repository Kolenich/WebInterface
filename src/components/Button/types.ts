import { ButtonProps } from '@material-ui/core/Button';
import { SvgIconComponent } from '@material-ui/icons';

export interface IProps extends ButtonProps {
  /** Тип иконки */
  icon?: SvgIconComponent;
  /** Расположение иконки */
  iconPlacement?: 'left' | 'right';
}
