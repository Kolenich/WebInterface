import { AccountBox, Assignment, AssignmentInd } from '@material-ui/icons';
import { ICard } from './types';

const cards: ICard[] = [
  {
    key: 1,
    icon: AccountBox,
    title: 'Сведения о заявителях',
    subheader: 'В соответствии с 54 ФЗ',
    steps: [
      { key: 1, title: 'Листы 1, 2, 3', completed: true },
      { key: 2, title: 'Листы 4, 5', completed: false },
      { key: 3, title: 'Лицензии', completed: false },
    ],
  },
  {
    key: 2,
    icon: Assignment,
    title: 'Сведения о сделке',
    subheader: 'В соответствии с 143 ФЗ',
    steps: [
      { key: 4, title: 'Выбрано основание', completed: true },
      { key: 5, title: 'Листы 4, 5', completed: true },
      { key: 6, title: 'Вложения', completed: false },
    ],
  },
  {
    key: 3,
    icon: AssignmentInd,
    title: 'Сведения об ОЭК',
    subheader: 'В соответствии с 65 ФЗ',
    steps: [
      { key: 7, title: 'Листы 7, 8, 9', completed: true },
      { key: 8, title: 'Листы 10, 11', completed: false },
      { key: 9, title: 'Группа лиц', completed: false },
    ],
  },
];

export default cards;
