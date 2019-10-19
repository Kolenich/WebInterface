import { AccountBox, Assignment, AssignmentInd } from '@material-ui/icons';
import declarerLogo from 'assests/img/fal-logo.jpg';
import { ICard } from './types';

const cards: ICard[] = [
  {
    key: 1,
    icon: AccountBox,
    image: declarerLogo,
    imageTitle: 'Сведения о заявителях',
    title: 'Сведения о заявителях',
    subheader: 'В соответствии с 54 ФЗ',
  },
  {
    key: 2,
    icon: Assignment,
    image: declarerLogo,
    imageTitle: 'Сведения о сделке',
    title: 'Сведения о сделке',
    subheader: 'В соответствии с 143 ФЗ',
  },
  {
    key: 3,
    icon: AssignmentInd,
    image: declarerLogo,
    imageTitle: 'Сведения об ОЭК',
    title: 'Сведения об ОЭК',
    subheader: 'В соответствии с 65 ФЗ',
  },
];

export default cards;
