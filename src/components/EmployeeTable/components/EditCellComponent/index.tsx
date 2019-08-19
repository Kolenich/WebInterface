import React, { FunctionComponent } from 'react';
import DateCell from './components/DateCell';
import FileCell from './components/FileCell';
import NoEditCell from './components/NoEditCell';
import SelectCell from './components/SelectCell';
import TextCell from './components/TextCell';
import { IEditCells, IProps } from './types';

const editorComponents: IEditCells<IProps> = {
  avatar: FileCell,
  last_name: TextCell,
  first_name: TextCell,
  middle_name: TextCell,
  phone: TextCell,
  email: TextCell,
  date_of_birth: DateCell,
  registration_date: NoEditCell,
  sex: SelectCell,
  age: NoEditCell,
};

/**
 * Компонент ячейки в таблице при редактировании
 * @param props
 * @returns {*}
 * @constructor
 */
const EditCellComponent: FunctionComponent<IProps> = (props: IProps): JSX.Element => {
  const { column, editingEnabled, row } = props;
  const EditorComponent: FunctionComponent<IProps> = editorComponents[column.name];
  const editable: boolean = editingEnabled || !row.id;
  const isEmail: boolean = column.name === 'email';
  const isPhone: boolean = column.name === 'phone';
  return (
    <EditorComponent disabled={!editable} isEmail={isEmail} isPhone={isPhone} {...props} />
  );
};

export default EditCellComponent;
