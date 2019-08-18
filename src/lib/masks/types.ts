import { MaskedInputProps } from 'react-text-mask';

export interface IProps extends MaskedInputProps {
  /** Функция для привязки ref */
  inputRef: (ref: HTMLElement | null) => void;
}
