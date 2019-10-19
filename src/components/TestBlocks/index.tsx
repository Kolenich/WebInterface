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
      <Grid
        container
        alignItems="center"
        spacing={5}
        className={classes.container}
        justify="space-around"
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
    </>
  );
};

export default TestBlocks;
