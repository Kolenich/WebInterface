import {
  CustomPaging,
  DataTypeProvider,
  DataTypeProviderProps,
  Filter,
  FilteringState,
  PagingState,
  Sorting,
  SortingState,
} from '@devexpress/dx-react-grid';
import {
  DragDropProvider,
  Grid,
  PagingPanel,
  TableColumnReordering,
  TableFilterRow,
  TableHeaderRow,
  VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Loading } from 'components';
import { Context } from 'components/GlobalContext';
import { IGlobalState } from 'components/GlobalContext/types';
import RootComponent from 'components/TableComponents/RootComponent';
import RowComponent from 'components/TableComponents/RowComponent';
import api from 'lib/api';
import { DASH_BOARD_TITLES } from 'lib/constants';
import {
  filterRowMessages,
  pagingPanelMessages,
  tableHeaderRowMessage,
  tableMessages,
} from 'lib/translate';
import { IApiResponse, IGetConfig, ITable } from 'lib/types';
import { getErrorMessage } from 'lib/utils';
import { useSnackbar } from 'notistack';
import { tableSettings, tasksFilterLookUps, tasksSortingLookUps } from 'pages/TasksTable/settings';
import React, { FC, useContext, useEffect, useState } from 'react';
import customDataTypes from './customDataTypes';
import styles from './styles';
import { IProps, IRow } from './types';
import { getFilteringConfig, getPaginationConfig, getSortingConfig, urlFilter } from './utils';

const useStyles = makeStyles(styles);

/**
 * Компонент таблицы для отображения всех заданий у пользователя
 * @param {match<IFilterParams>} match передаваемые параметры в адресную строку
 * @return {JSX.Element}
 * @constructor
 */
const TasksTable: FC<IProps> = ({ match }) => {
  const classes = useStyles();

  const {
    setters: { updateDashBoardTitle }, getters: { documentTitle },
  } = useContext<IGlobalState>(Context);
  const { enqueueSnackbar } = useSnackbar();

  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  // Переменные состояния основной таблицы
  const [table, setTable] = useState<ITable<IRow>>({
    rows: [],
    filters: [],
    pageSizes: [5, 10, 20],
    totalCount: 0,
    pageSize: 5,
    currentPage: 0,
    sorting: [],
  });

  /**
   * Эффект для подключения к вебсокету
   */
  useEffect(() => {
    if (!websocket) {
      const ws = api.websocket('tasks');
      ws.onmessage = ({ data }) => {
        const row: IRow = JSON.parse(data);
        setTable((oldTable) => ({
          ...oldTable,
          rows: oldTable.rows.concat(row),
        }));
        enqueueSnackbar(`Пользователь ${row.assigned_by} назначил(а) Вам новое задание.`, { variant: 'info' });
      };
      setWebsocket(ws);
    }

    return websocket?.close;
  }, [websocket, enqueueSnackbar]);

  // Переменная состояния загрузки
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    document.title = `${documentTitle} | Мои задания`;
  }, [documentTitle]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const params: IGetConfig = {
        ...getPaginationConfig(table.pageSize, table.currentPage),
        ...getFilteringConfig(table.filters, tasksFilterLookUps),
        ...getSortingConfig(table.sorting, tasksSortingLookUps),
        // В зависимости от выбранного пункта меню фильтруем список заданий
        ...urlFilter(match.params.filter),
      };

      try {
        const {
          data: {
            results: rows,
            count: totalCount,
          },
        } = await api.getContent<IApiResponse<IRow>>('tasks/dashboard/', params);
        setTable((oldTable) => ({ ...oldTable, rows, totalCount }));
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
      } finally {
        setLoading(false);
      }
    })();
  }, [table.filters, table.sorting, table.pageSize, table.currentPage, match.params.filter,
    enqueueSnackbar]);

  useEffect(() => {
    updateDashBoardTitle(DASH_BOARD_TITLES[match.params.filter]);
  }, [match.params.filter, updateDashBoardTitle]);

  return (
    <>
      <Paper className={classes.paper}>
        <Grid
          rows={table.rows}
          columns={tableSettings.columns}
          getRowId={(row: IRow) => row.id!}
          rootComponent={RootComponent}
        >
          {customDataTypes.map((props: DataTypeProviderProps, index) => (
            <DataTypeProvider key={index} {...props} />
          ))}

          <DragDropProvider/>

          <SortingState
            sorting={table.sorting}
            onSortingChange={(sorting: Sorting[]) => setTable((oldTable) => ({
              ...oldTable,
              sorting,
            }))}
            columnExtensions={tableSettings.sortingStateColumnExtensions}
          />

          <PagingState
            currentPage={table.currentPage}
            pageSize={table.pageSize}
            onPageSizeChange={(pageSize: number) => setTable((oldTable) => ({
              ...oldTable,
              pageSize,
              currentPage: 0,
            }))}
            onCurrentPageChange={(currentPage: number) => setTable((oldTable) => ({
              ...oldTable,
              currentPage,
            }))}
          />

          <CustomPaging
            totalCount={table.totalCount}
          />

          <FilteringState
            filters={table.filters}
            onFiltersChange={(filters: Filter[]) => setTable((oldTable) => ({
              ...oldTable,
              filters,
            }))}
            columnExtensions={tableSettings.filteringStateColumnExtensions}
          />

          <VirtualTable
            height="auto"
            messages={tableMessages}
            rowComponent={RowComponent}
            columnExtensions={tableSettings.columnsExtensions}
          />

          <TableColumnReordering
            defaultOrder={tableSettings.columns.map((column) => column.name)}
          />

          <TableHeaderRow
            showSortingControls
            messages={tableHeaderRowMessage}
          />

          <TableFilterRow
            showFilterSelector
            messages={filterRowMessages}
          />

          <PagingPanel
            pageSizes={table.pageSizes}
            messages={pagingPanelMessages}
          />
        </Grid>
      </Paper>
      {loading && <Loading/>}
    </>
  );
};

export default TasksTable;
