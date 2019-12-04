import { ICustomDataTypeProviderProps } from 'lib/types';
import AssignerEditor from './components/EditorComponents/AssignerEditor';
import DateTimeEditor from './components/EditorComponents/DateTimeEditor';
import EmptyEditor from './components/EditorComponents/EmptyEditor';
import TextEditor from './components/EditorComponents/TextEditor';
import AttachmentFormatter from './components/FormatterComponents/AttachmentFormatter';
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
  {
    key: 4,
    for: tableSettings.attachmentColumns!,
    editorComponent: EmptyEditor,
    formatterComponent: AttachmentFormatter,
    availableFilterOperations: [],
  },
];

export default customDataTypes;
