import columnSettings from './columnSettings';
import DateEditor from './components/EditorComponents/DateEditor';
import DateTimeEditor from './components/EditorComponents/DateTimeEditor';
import NoFilterEditor from './components/EditorComponents/NoFilterEditor';
import NumberEditor from './components/EditorComponents/NumberEditor';
import SelectEditor from './components/EditorComponents/SelectEditor';
import TextEditor from './components/EditorComponents/TextEditor';
import DateFormatter from './components/FormatterComponents/DateFormatter';
import DateTimeFormatter from './components/FormatterComponents/DateTimeFormatter';
import ImageFormatter from './components/FormatterComponents/ImageFormatter';
import SexFormatter from './components/FormatterComponents/SexFormatter';
import { ICustomDataTypeProviderProps } from './types';

/**
 * Набор кастомных типов для таблицы
 */
const customDataTypes: ICustomDataTypeProviderProps[] = [
  {
    key: 1,
    for: columnSettings.dateColumns,
    formatterComponent: DateFormatter,
    editorComponent: DateEditor,
    availableFilterOperations: columnSettings.dateFilterOperations,
  },
  {
    key: 2,
    for: columnSettings.dateTimeColumns,
    formatterComponent: DateTimeFormatter,
    editorComponent: DateTimeEditor,
    availableFilterOperations: columnSettings.dateTimeFilterOperations,
  },
  {
    key: 3,
    for: columnSettings.sexColumns,
    formatterComponent: SexFormatter,
    editorComponent: SelectEditor,
    availableFilterOperations: columnSettings.sexFilterOperations,
  },
  {
    key: 4,
    for: columnSettings.numberColumns,
    editorComponent: NumberEditor,
    availableFilterOperations: columnSettings.numberFilterOperations,
  },
  {
    key: 5,
    for: columnSettings.textColumns,
    editorComponent: TextEditor,
    availableFilterOperations: columnSettings.textFilterOperations,
  },
  {
    key: 6,
    for: columnSettings.avatarColumns,
    formatterComponent: ImageFormatter,
    editorComponent: NoFilterEditor,
    availableFilterOperations: [],
  },
];

export default customDataTypes;
