import React, { useEffect } from "react";

import { Grid, Container, Typography, Paper, Button, makeStyles } from "@material-ui/core";

import Navbar from "../../components/Navbar";

const useStyles = makeStyles({});

const Landing = () => {
  useEffect(() => {
    document.title = "React Clinic";
  }, []);

  return (
    <Navbar>
      <Container maxWidth="lg">
        <Paper elevation={2} style={{ width: "100%", padding: "2em" }}>
          <Grid container justify="space-between" alignItems="center">
            {/* replace all of the below with proper text */}
            <Grid item>
              <Typography variant="h3"> Lorem, ipsum. </Typography>
            </Grid>
            <Grid item>
              <Typography varient="h5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, quas.</Typography>
            </Grid>

            <Grid item container direction="column" style={{ padding: "5em 0em" }}>
              <Grid item>
                <Typography align="center" variant="overline" display="block" style={{ padding: "1em" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad pariatur harum temporibus debitis eius quo magni
                  distinctio, impedit odit illo?
                </Typography>
                <Typography align="center" varient="body1" gutterBottom>
                  Lorem, ipsum dolor sit amet adipisicing elit. Quisquam voluptatem itaque maiores voluptate ducimus unde
                  laudantium ipsum, libero magnam sunt.
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="center" varient="body2" gutterBottom>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis dolorem ad expedita blanditiis quisquam
                  minus repudiandae harum nesciunt consequuntur at laboriosam excepturi pariatur officia alias natus libero
                  maxime, sapiente et earum. Id accusamus nesciunt pariatur atque in qui enim ducimus velit, esse, quam
                  excepturi harum aliquid. Sapiente quia esse ad?
                </Typography>
              </Grid>
              <Grid item>
                <Grid container justify="center" alignItems="center">
                  <Grid item>
                    <Button variant="contained" color="primary" style={{ margin: "1em" }}>
                      Learn More
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" style={{ margin: "1em" }}>
                      Contact Us
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Navbar>
  );
};

export default Landing;
