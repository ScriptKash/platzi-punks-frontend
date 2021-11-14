import * as React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
  Button,
  Container,
  useMediaQuery,
} from "@mui/material";

import CssBaseline from "@mui/material/CssBaseline";
import Wallet from "../wallet";
import CodeIcon from "@mui/icons-material/Code";

const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
  palette: {
    secondary: {
      main: "#121f3d",
    },
    background: {
      default: "#121f3d",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

export default function Layout({ children }) {
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar color="secondary" position="relative">
        <Toolbar>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Box display="flex" alignItems="center">
              <Link to="/">
                <img
                  src="https://i.imgur.com/Uc1n2t1.png"
                  alt="Logo"
                  style={{ width: 150, marginRight: 10 }}
                />
              </Link>
              {!mobile && (
                <>
                  <Button
                    style={{
                      marginLeft: 10,
                      fontWeight: "bold",
                      borderRadius: 10,
                    }}
                    component={Link}
                    to="/punks"
                    variant="text"
                    size="small"
                  >
                    Galería
                  </Button>
                </>
              )}
            </Box>
            <Wallet />
          </Box>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
      <Container>
        <Box
          my={5}
          width="100%"
          justifyContent="flex-end"
          display="flex"
          alignItems="center"
        >
          <CodeIcon style={{ color: "#1976d2" }} />
          <Typography
            variant="body2"
            style={{ fontWeight: "bold", marginLeft: 5 }}
          >
            by fernando.gg
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
