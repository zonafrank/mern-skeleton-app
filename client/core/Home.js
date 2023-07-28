import React from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/CardMedia";
import unicornBikeImg from "../assets/images/unicornbike.jpg";
import { Link } from "react-router-dom";
import useStyles from "../hooks/useStyles";

const Home = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Typography variant="h6" className={classes.title}>
        Home Page
      </Typography>
      <CardMedia
        className={classes.media}
        image={unicornBikeImg}
        title="Unicorn Bicycle"
      />
      <CardContent>
        <Typography variant="body2" component="p">
          Welcome to MERN Skeleton home page
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Home;
