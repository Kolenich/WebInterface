import { FabProps } from '@material-ui/core/Fab';

export interface IProps extends FabProps {
  /** Текст всплывающей подсказки */
  tooltip: string;
  /** Текст самой кнопки */
  text: string;
}
