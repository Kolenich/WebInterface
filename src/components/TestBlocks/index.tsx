import {
  AppBar,
  Avatar,
  Card,
  CardHeader,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { createElement, FC } from 'react';
import cards from './structure';
import styles from './styles';
import { ICard, IProps } from './types';

const useStyles = makeStyles(styles);

const TestBlocks: FC<IProps> = ({ match }): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {`Ходатайство №${match.params.id}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid
        container
        alignItems="center"
        className={classes.container}
        justify="space-around"
      >
        {cards.map(({ key, icon, title, subheader }: ICard): JSX.Element => (
          <Grid item key={key}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar className={classes.avatar}>
                    {createElement(icon)}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVert />
                  </IconButton>
                }
                title={title}
                subheader={subheader}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TestBlocks;
