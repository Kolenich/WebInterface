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
import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent, useState } from 'react';
import LabelComponent from './components/LabelComponent';
import demoData from './demoData';
import { styles } from './styles';
import { IChart, IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент графиков.
 */
const EmployeeChart: FunctionComponent<IProps> = (): JSX.Element => {
  const classes = useStyles();

  const [chart] = useState<IChart>(demoData);

  const { data } = chart;

  return (
    <Paper className={classes.paperMain}>
      <Chart data={data}>
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
};

export default EmployeeChart;
