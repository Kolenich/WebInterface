import React, { ChangeEvent, Component, ComponentState, ReactNode } from 'react';
import { WithStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { styles } from './styles';
import withStyles from '@material-ui/core/styles/withStyles';
import api from '../../lib/api';
import { Employee } from '../../lib/types';
import { AxiosError, AxiosResponse } from 'axios';
import { Locales } from '../../lib/utils';
import EmployeeTable from '../EmployeeTable';

interface Props extends WithStyles<typeof styles> {
}

interface State {
  employees: Employee[];
  locale: Locales;
  value: number;
  labelWidth: number;
}

class MainMenu extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      employees: [],
      locale: 'ru',
      value: 0,
      labelWidth: 40,
    };
  }

  componentDidMount(): ComponentState {
    api.getContent<Employee[]>('employees')
      .then((response: AxiosResponse<Employee[]>) => {
        const employees: Employee[] = response.data;
        this.setState({ employees });
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  private handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): ComponentState => {
    const locale: Locales = event.target.value as Locales;
    this.setState({ locale });
  }

  handleChange = (event: ChangeEvent<{}>, value: number) => {
    this.setState({ value });
  }

  public render(): ReactNode {
    const { locale, value, labelWidth } = this.state;
    const { classes } = this.props;
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
            <Tab label="Сотрудники"/>
            <Tab label="Организации"/>
          </Tabs>
        </AppBar>
        {value === 0 && <EmployeeTable/>}
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="locale">Язык</InputLabel>
          <Select
            value={locale}
            onChange={this.handleSelectChange}
            input={<OutlinedInput labelWidth={labelWidth}/>}
          >
            <MenuItem value="ru">Русский</MenuItem>
            <MenuItem value="en-US">English</MenuItem>
            <MenuItem value="fr">French</MenuItem>
          </Select>
        </FormControl>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainMenu);
