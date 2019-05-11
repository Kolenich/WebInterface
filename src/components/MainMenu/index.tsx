import React, { ChangeEvent, Component, ComponentState, FormEvent, ReactNode } from 'react';
import { WithStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
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
import { dateOptions, Locales } from '../../lib/utils';

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
      labelWidth: 0,
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

  private handleSelectChange = (event: FormEvent<HTMLSelectElement>): ComponentState => {
    const locale: Locales = event.currentTarget.value as Locales;
    console.log(event.currentTarget)
    this.setState({ locale });
  }

  handleChange = (event: ChangeEvent<{}>, value: number) => {
    this.setState({ value });
  }

  handleChangeIndex = (value: number) => {
    this.setState({ value });
  }

  public render(): ReactNode {
    const { employees, locale, value, labelWidth } = this.state;
    const { classes } = this.props;
    return (
      <Paper classes={{ root: classes.paperRoot }}>
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
            {employees.map((employee: Employee) => (
              <Tab key={employee.id} label={`${employee.last_name} ${employee.first_name}`}/>
            ))}
          </Tabs>
        </AppBar>
        <div>
          {employees.length &&
          new Date(employees[value].date_of_birth).toLocaleDateString(locale, dateOptions)}
        </div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="locale">Язык</InputLabel>
          <Select
            value={locale}
            onChange={this.handleSelectChange}
            input={<OutlinedInput labelWidth={labelWidth} name="locale" id="locale"/>}
          >
            <MenuItem value="ru">Русский</MenuItem>
            <MenuItem value="en-US">English</MenuItem>
            <MenuItem value="fr">French</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainMenu);
