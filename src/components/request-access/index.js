import { Card, Typography, Box, Container, CardContent } from "@mui/material";

const RequestAccess = () => {
  return (
    <Box my={5}>
      <Container>
        <Card
          style={{
            backgroundColor: "#24385b",
            borderRadius: 15,
            position: "relative",
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" height={300}>
              <Box>
                <Typography variant="h3" style={{ fontWeight: 900 }}>
                  Conecta tu Wallet
                </Typography>
                <Typography variant="h5">Para acceder a la app</Typography>
              </Box>
            </Box>
            <img
              src="https://avataaars.io/"
              alt="Platzi Punks"
              style={{
                position: "absolute",
                top: -100,
                right: -40,
                width: 500,
                transform: "rotate(-20deg)",
                opacity: 0.3,
              }}
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default RequestAccess;
