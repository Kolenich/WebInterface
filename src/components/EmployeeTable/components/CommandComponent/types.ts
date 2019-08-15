import { TableEditColumn } from '@devexpress/dx-react-grid-material-ui';
import { FunctionComponent } from 'react';

export interface IProps extends TableEditColumn.CommandProps {
}

export interface ICommandComponents<Props> {
  /** Компонент кнопки "Добавить" */
  add: FunctionComponent<Props>;
  /** Компонент кнопки "Редактировать" */
  edit: FunctionComponent<Props>;
  /** Компонент кнопки "Удалить" */
  delete: FunctionComponent<Props>;
  /** Компонент кнопки "Отмена" */
  cancel: FunctionComponent<Props>;
  /** Компонент кнопки "Подтвердить" */
  commit: FunctionComponent<Props>;

  [index: string]: FunctionComponent<Props>;
}
