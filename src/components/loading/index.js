import React from "react";
import { Grid, Skeleton, Typography, Box } from "@mui/material";

const LoadingComponent = ({ punks, array = 8 }) => {
  return (
    <>
      {punks ? (
        <Grid container spacing={1}>
          {[...Array(array)].map((a, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton
                animation="wave"
                style={{ color: "#24385b", borderRadius: 15 }}
                variant="rectangular"
                width="100%"
                height={300}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Skeleton
              animation="wave"
              style={{ color: "#24385b", borderRadius: 15 }}
              variant="rectangular"
              width="100%"
              height={300}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography component="div" variant="h4">
              <Skeleton />
            </Typography>
            <Typography component="div" variant="h6">
              <Skeleton />
            </Typography>
            <Box my={3}>
              <Typography component="div">
                <Skeleton />
              </Typography>
              <Typography component="div">
                <Skeleton />
              </Typography>
            </Box>

            {[...Array(10)].map((a, i) => (
              <Typography key={i} component="div" variant="h3">
                <Skeleton />
              </Typography>
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default LoadingComponent;
