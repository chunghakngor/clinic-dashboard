import React from "react";

import { Container, Grid, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Error404 = () => {
  return (
    <Container fluid>
      <Helmet>
        <title>React Clinic | Error 404</title>
      </Helmet>
      <Grid container direction="column" justify="center" alignItems="center" spacing={6}>
        <Grid item style={{ marginTop: "30%" }}>
          <Typography variant="h1" component="h2" align="center" gutterBottom>
            Error 404!
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" align="center">
            Looks like you've made a wrong turn
          </Typography>
        </Grid>
        <Grid item>
          <Link to="/">
            <Button variant="contained">Go back home!</Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Error404;
