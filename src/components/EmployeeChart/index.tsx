import { Animation, EventTracker, ValueScale } from '@devexpress/dx-react-chart';
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  Legend,
  SplineSeries,
  Title,
  Tooltip,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Paper, withStyles } from '@material-ui/core';
import React, { Component, ComponentState, ReactNode } from 'react';
import demoData from './demoData';
import { styles } from './styles';
import { IProps, IState } from './types';

/**
 * Базовый компонент для указателей на оси абсцисс
 * @param symbol дополниьельный к значению символ
 * @constructor
 */
const Label = (symbol: string) => ({ text, ...props }: ValueAxis.LabelProps) => {
  return (
    <ValueAxis.Label
      {...props}
      text={text + symbol}
    />
  );
};

const SaleLabel = Label(' тыс. руб.');
const TransactionLabel = Label(' ед.');

/**
 * Компонент графиков.
 */
class EmployeeChart extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      ...demoData,
    };
  }

  /**
   * Метод, вызываемый после монтирования компонента
   */
  public componentDidMount(): ComponentState {
    document.title = 'Графики';
  }

  /**
   * Базовый метод рендера.
   */
  public render(): ReactNode {
    const { classes } = this.props;
    const { chartData } = this.state;
    return (
      <Paper className={classes.paperMain}>
        <Chart data={chartData}>
          <Title text="Графики" />
          <ValueScale name="sale" />
          <ValueScale name="total" />
          <ArgumentAxis />
          <ValueAxis
            scaleName="sale"
            showGrid={false}
            showLine
            showTicks
            labelComponent={SaleLabel}
          />
          <ValueAxis
            scaleName="total"
            position="right"
            showGrid={false}
            showLine
            showTicks
            labelComponent={TransactionLabel}
          />
          <BarSeries
            name="Всего продано"
            valueField="sale"
            argumentField="month"
            scaleName="sale"
          />
          <SplineSeries
            name="Всего транзакций"
            valueField="total"
            argumentField="month"
            scaleName="total"
          />
          <Animation />
          <Legend position="bottom" />
          <EventTracker />
          <Tooltip />
        </Chart>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EmployeeChart);
