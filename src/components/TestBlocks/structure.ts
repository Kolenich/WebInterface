import { AccountBox, Assignment, AssignmentInd } from '@material-ui/icons';
import { ICard } from './types';

const cards: ICard[] = [
  {
    key: 1,
    icon: AccountBox,
    title: 'Сведения о заявителях',
    subheader: 'В соответствии с 54 ФЗ',
  },
  {
    key: 2,
    icon: Assignment,
    title: 'Сведения о сделке',
    subheader: 'В соответствии с 143 ФЗ',
  },
  {
    key: 3,
    icon: AssignmentInd,
    title: 'Сведения об ОЭК',
    subheader: 'В соответствии с 65 ФЗ',
  },
];

export default cards;
