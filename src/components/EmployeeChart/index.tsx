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
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React, { PureComponent, ReactNode } from 'react';
import LabelComponent from './components/LabelComponent';
import demoData from './demoData';
import { styles } from './styles';
import { IProps, IState } from './types';

/**
 * Компонент графиков.
 */
class EmployeeChart extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    document.title = 'Графики';
    this.state = {
      ...demoData,
    };
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
            labelComponent={LabelComponent('тыс. руб.')}
          />
          <ValueAxis
            scaleName="total"
            position="right"
            showGrid={false}
            showLine
            showTicks
            labelComponent={LabelComponent('ед.')}
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
