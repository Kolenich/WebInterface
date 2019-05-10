import React, { Component, ComponentState, FormEvent, ReactNode } from 'react';
import { WithStyles } from '@material-ui/core';
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
}

class MainMenu extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      employees: [],
      locale: 'ru',
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
    this.setState({ locale });
  }

  public render(): ReactNode {
    const { employees, locale } = this.state;
    return (
      <>
        {employees.map((employee: Employee, index: number) => (
          <div key={`${employee.id}-${index}`}>
            {new Date(employee.date_of_birth).toLocaleDateString(locale, dateOptions)}
          </div>
        ))}
        <select onChange={this.handleSelectChange}>
          <option value="ru">Русский</option>
          <option value="en-US">English(US)</option>
          <option value="en-GB">English</option>
          <option value="fr">French</option>
        </select>
      </>
    );
  }
}

export default withStyles(styles)(MainMenu);
