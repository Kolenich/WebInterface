import {
  AppBar,
  Avatar,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Grid,
  Toolbar,
  Typography,
} from '@material-ui/core';
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
      <Typography component="div" className={classes.root}>
        <Grid
          container
          alignItems="center"
          className={classes.container}
          justify="space-evenly"
        >
          {cards.map(({ key, icon, title, subheader, image, imageTitle }: ICard): JSX.Element => (
            <Grid item xs="auto" key={key}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardHeader
                    avatar={
                      <Avatar className={classes.avatar}>
                        {createElement(icon)}
                      </Avatar>
                    }
                    title={title}
                    subheader={subheader}
                  />
                  <CardMedia
                    className={classes.cardImage}
                    component="img"
                    alt={imageTitle}
                    image={image}
                    title={imageTitle}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Typography>
    </>
  );
};

export default TestBlocks;
