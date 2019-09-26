import { ICustomDataTypeProviderProps } from 'lib/types';
import AssignerEditor from './components/EditorComponents/AssignerEditor';
import DateTimeEditor from './components/EditorComponents/DateTimeEditor';
import TextEditor from './components/EditorComponents/TextEditor';
import DateTimeFormatter from './components/FormatterComponents/DateTimeFormatter';
import { tableSettings } from './settings';

/**
 * Набор кастомных типов для таблицы
 */
const customDataTypes: ICustomDataTypeProviderProps[] = [
  {
    key: 1,
    for: tableSettings.dateTimeColumns!,
    formatterComponent: DateTimeFormatter,
    editorComponent: DateTimeEditor,
    availableFilterOperations: tableSettings.dateTimeFilterOperations,
  },
  {
    key: 2,
    for: tableSettings.textColumns!,
    editorComponent: TextEditor,
    availableFilterOperations: tableSettings.textFilterOperations,
  },
  {
    key: 3,
    for: tableSettings.assignerColumns!,
    editorComponent: AssignerEditor,
    availableFilterOperations: tableSettings.assignerFilterOperations,
  },
];

export default customDataTypes;
