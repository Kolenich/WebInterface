import { AppBar, Tab, Tabs, Typography, withStyles } from '@material-ui/core';
import React, { ChangeEvent, ComponentState, PureComponent, ReactNode } from 'react';
import SwipeableViews from 'react-swipeable-views';
import EmployeeChart from '../EmployeeChart';
import EmployeeTable from '../EmployeeTable';
import { styles } from './styles';
import { IProps, IState, ITabContainerProps } from './types';

/**
 * Компонент основной страницы
 */
class MainPage extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  /**
   * Компонент-обертка для пункта меню
   * @param children дочерние DOM-элементы
   * @param dir направление
   * @constructor
   */
  TabContainer = ({ children, dir }: ITabContainerProps): JSX.Element => {
    const { classes } = this.props;
    return (
      <Typography component="div" dir={dir} className={classes.tabContainer}>
        {children}
      </Typography>
    );
  }

  /**
   * Метод, обрабатывающий смену активного пункта меню
   * @param event DOM-событие
   * @param value индекс пункта меню
   */
  private handleChange = (event: ChangeEvent<{}>, value: number): ComponentState => {
    this.setState({ value });
  }

  /**
   * Метод аналогичный handleChange, но для анимации перехода
   * @param value индекс пункта меню
   */
  private handleChangeIndex = (value: number): ComponentState => {
    this.setState({ value });
  }

  /**
   * Базовый метод рендера
   */
  public render(): ReactNode {
    const { value } = this.state;
    const { theme } = this.props;
    return (
      <>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            scrollButtons="auto"
            centered
          >
            <Tab label="Сотрудники" />
            <Tab label="Организации" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ?
            'x-reverse' :
            'x'}
          index={value}
          onChangeIndex={this.handleChangeIndex}
        >
          <this.TabContainer dir={theme.direction}>
            <EmployeeTable />
          </this.TabContainer>
          <this.TabContainer dir={theme.direction}>
            <EmployeeChart />
          </this.TabContainer>
        </SwipeableViews>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainPage);
