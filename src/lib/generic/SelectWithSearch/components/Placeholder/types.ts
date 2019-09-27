import { ISelectItem } from 'lib/generic/Select/types';
import { PlaceholderProps } from 'react-select/src/components/Placeholder';

export type MuiPlaceholderProps = Omit<PlaceholderProps<ISelectItem>, 'innerProps'> &
  Partial<Pick<PlaceholderProps<ISelectItem>, 'innerProps'>>;
