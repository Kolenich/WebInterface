import {
  AppBar,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { createElement, FC, memo } from 'react';
import cards from './structure';
import styles from './styles';
import { ICard, IProps, IStep } from './types';

const useStyles = makeStyles(styles);

const TestBlocks: FC<IProps> = ({ match }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            {`Ходатайство №${match.params.id}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography component="div" className={classes.root}>
        <Grid
          container
          alignItems="center"
          className={classes.container}
          justify="space-evenly"
        >
          {cards.map(({ key, icon, title, subheader, steps }: ICard) => (
            <Grid item xs="auto" key={key}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar>
                      {createElement(icon)}
                    </Avatar>
                  }
                  title={title}
                  subheader={subheader}
                />
                <CardContent>
                  <List>
                    {steps.map(({ title, completed, key, description }: IStep) => (
                      <ListItem key={key}>
                        <ListItemAvatar>
                          <Avatar className={completed
                            ? classes.completed
                            : classes.inCompleted}
                          >
                            {completed
                              ? <Check />
                              : <Close />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={title} secondary={description} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Typography>
    </>
  );
};

export default memo(TestBlocks);
