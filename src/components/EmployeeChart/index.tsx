import React, { Component, ReactNode } from 'react';
import { Props, State } from './types';
import { Paper, withStyles } from '@material-ui/core';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  SplineSeries,
  Legend,
  Tooltip,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { ValueScale, Animation, EventTracker } from '@devexpress/dx-react-chart';
import { styles } from './styles';
import demoData from './demoData';

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

class EmployeeChart extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...demoData,
    };
  }

  public render(): ReactNode {
    const { classes } = this.props;
    const { chartData } = this.state;
    return (
      <Paper
        className={classes.paperMain}
      >
        <Chart
          data={chartData}
        >
          <Title
            text="Графики"
          />
          <ValueScale
            name="sale"
          />
          <ValueScale
            name="total"
          />
          <ArgumentAxis/>
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
          <Animation/>
          <Legend
            position="bottom"
          />
          <EventTracker/>
          <Tooltip/>
        </Chart>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EmployeeChart);
