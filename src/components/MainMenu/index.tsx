import React, { Component, ReactNode } from 'react';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import withStyles from '@material-ui/core/styles/withStyles';

interface Props extends WithStyles<typeof styles> {
}

interface State {
}

class MainMenu extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public render(): ReactNode {
    const { classes } = this.props;
    return (
      <div>
        Привет
      </div>
    );
  }
}

export default withStyles(styles)(MainMenu);