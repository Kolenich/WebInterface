import { ICustomDataTypeProviderProps } from 'lib/types';
import AssignerEditor from './components/EditorComponents/AssignerEditor';
import DateEditor from './components/EditorComponents/DateEditor';
import TextEditor from './components/EditorComponents/TextEditor';
import DateFormatter from './components/FormatterComponents/DateFormatter';
import { tableSettings } from './settings';

/**
 * Набор кастомных типов для таблицы
 */
const customDataTypes: ICustomDataTypeProviderProps[] = [
  {
    key: 1,
    for: tableSettings.dateColumns!,
    formatterComponent: DateFormatter,
    editorComponent: DateEditor,
    availableFilterOperations: tableSettings.dateFilterOperations,
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
