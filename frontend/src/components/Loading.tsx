import React from "react"
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = () => {
  return (
    <Container className="d-flex justify-content-center" style={{ height: "100vh" }}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item />
        <Grid item>
          <CircularProgress />
        </Grid>
        <Grid item />
      </Grid>
    </Container>
  );
};

export default Loading;
