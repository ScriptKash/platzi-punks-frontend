import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
  alpha,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

import { useWeb3React } from "@web3-react/core";
import usePlatziPunks from "../../hooks/usePlatziPunks";
import useToast from "../../hooks/useToast";
import PunkCard from "../../components/card";
import { usePlatziPunksData } from "../../hooks/usePlatziPunksData";
import LoadingComponent from "../../components/loading";

const Home = () => {
  const [imageSrc, setImageSrc] = useState("");

  const [isMinting, setIsMinting] = useState(false);

  const { toast, handleSetToast, handleCloseToast } = useToast();

  const { active, account } = useWeb3React();

  const platziPunks = usePlatziPunks();

  const { punks, loading, update } = usePlatziPunksData();

  const nextId = punks?.slice(-1)[0]?.tokenId + 1 || 1;

  const getPlatziPunksData = useCallback(async () => {
    if (platziPunks) {
      const totalSupply = await platziPunks.methods.totalSupply().call();
      const dnaPreview = await platziPunks.methods
        .deterministicPseudoRandomDNA(totalSupply, account)
        .call();
      const image = await platziPunks.methods.imageByDNA(dnaPreview).call();
      setImageSrc(image);
    }
  }, [platziPunks, account]);

  const mint = () => {
    setIsMinting(true);

    platziPunks.methods
      .mint()
      .send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        handleSetToast({
          open: true,
          title: "Transacción enviada",
          description: txHash,
          status: "info",
        });
      })
      .on("receipt", () => {
        setIsMinting(false);
        handleSetToast({
          open: true,
          title: "Transacción confirmada",
          description: "Nunca pares de aprender.",
          status: "success",
        });
        update();
      })
      .on("error", (error) => {
        setIsMinting(false);
        handleSetToast({
          open: true,
          title: "Transacción fallida",
          description: error.message,
          status: "error",
        });
      });
  };

  useEffect(() => {
    getPlatziPunksData();
  }, [getPlatziPunksData]);

  return (
    <>
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.status}
          sx={{ width: "100%" }}
        >
          {toast.title} - {toast.description}
        </Alert>
      </Snackbar>

      <Box my={5}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h2" style={{ fontWeight: 900 }}>
                Un Platzi Punk
              </Typography>
              <Typography variant="h4">nunca para de aprender</Typography>
              <Box my={2}>
                <Divider>Acerca de</Divider>
              </Box>
              <Typography>
                Platzi Punks es una colección de Avatares randomizados cuya
                metadata es almacenada on-chain. Poseen características únicas y
                sólo hay 10000 en existencia
              </Typography>
              <Box my={3}>
                <Typography color="primary">
                  Cada Platzi Punk se genera de forma secuencial basado en tu
                  address, usa el previsualizador para averiguar cuál sería tu
                  Platzi Punk si minteas en este momento
                </Typography>
              </Box>
              <Box display="flex" alignItems>
                <Box sx={{ m: 1, position: "relative" }}>
                  <Button
                    variant="contained"
                    style={{
                      borderRadius: 15,
                      padding: 10,
                      color: !platziPunks ? alpha("#fff", 0.5) : "#fff",
                    }}
                    disabled={!platziPunks || isMinting}
                    onClick={mint}
                  >
                    Obtén tu Punk
                  </Button>
                  {isMinting && (
                    <CircularProgress
                      size={24}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                      }}
                    />
                  )}
                </Box>
                <Button
                  style={{ borderRadius: 15, padding: 10, marginLeft: 20 }}
                  variant="text"
                  component={Link}
                  to="/punks"
                >
                  Galería
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <img
                  src={active ? imageSrc : "https://avataaars.io/"}
                  alt="Platzi Punks"
                />
                {active ? (
                  <>
                    <Box
                      mb={2}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      Próximo ID:
                      <Chip
                        style={{ marginLeft: 5, marginRight: 5 }}
                        size="small"
                        color="success"
                        variant="outlined"
                        label={nextId}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      onClick={getPlatziPunksData}
                      style={{ borderRadius: 15 }}
                    >
                      Actualizar
                    </Button>
                  </>
                ) : (
                  <Chip label="Wallet desconectada" />
                )}
              </Box>
            </Grid>
          </Grid>

          {active && (
            <Box mt={5}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  Nuevos
                </Typography>
                <Button variant="text" component={Link} to="/punks">
                  Ver más
                </Button>
              </Box>
              {loading ? (
                <LoadingComponent punks array={3} />
              ) : (
                <Grid container spacing={1}>
                  {punks
                    .slice(0)
                    .reverse()
                    .splice(0, 3)
                    .map(({ name, image, tokenId, owner }) => (
                      <Grid item xs={12} sm={6} md={4} key={tokenId}>
                        <Link
                          to={`/punks/${tokenId}`}
                          style={{ textDecoration: "none" }}
                        >
                          <PunkCard
                            image={image}
                            name={name}
                            tokenId={tokenId}
                            owner={owner}
                          />
                        </Link>
                      </Grid>
                    ))}
                </Grid>
              )}
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Home;
