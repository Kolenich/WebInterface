import { DataTypeProviderProps } from '@devexpress/dx-react-grid';
import AssignerEditor from './components/EditorComponents/AssignerEditor';
import DateTimeEditor from './components/EditorComponents/DateTimeEditor';
import EmptyEditor from './components/EditorComponents/EmptyEditor';
import TextEditor from './components/EditorComponents/TextEditor';
import AttachmentFormatter from './components/FormatterComponents/AttachmentFormatter';
import DateTimeFormatter from './components/FormatterComponents/DateTimeFormatter';

/**
 * Набор кастомных типов для таблицы
 */
const customDataTypes: DataTypeProviderProps[] = [
  {
    for: ['date_of_issue', 'dead_line'],
    formatterComponent: DateTimeFormatter,
    editorComponent: DateTimeEditor,
    availableFilterOperations: [
      'greaterThan',
      'greaterThanOrEqual',
      'lessThan',
      'lessThanOrEqual',
      'notEqual',
    ],
  },
  {
    for: ['summary', 'comment'],
    editorComponent: TextEditor,
    availableFilterOperations: ['contains', 'startsWith', 'endsWith', 'equal', 'notEqual'],
  },
  {
    for: ['assigned_by'],
    editorComponent: AssignerEditor,
    availableFilterOperations: ['equal'],
  },
  {
    for: ['attachment'],
    editorComponent: EmptyEditor,
    formatterComponent: AttachmentFormatter,
    availableFilterOperations: [],
  },
];

export default customDataTypes;
