import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";

import {
  Container,
  Box,
  Grid,
  Typography,
  Chip,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Snackbar,
  Alert,
  alpha,
  CircularProgress,
  TextField,
  Popover,
} from "@mui/material";
import { usePlatziPunkData } from "../../hooks/usePlatziPunksData";
import RequestAccess from "../../components/request-access";

import PunkCard from "../../components/card";
import LoadingComponent from "../../components/loading";
import usePlatziPunks from "../../hooks/usePlatziPunks";
import useToast from "../../hooks/useToast";

const Punk = () => {
  const { active, account, library } = useWeb3React();

  const { tokenId } = useParams();

  const { loading, punk, update } = usePlatziPunkData(tokenId);

  const { image, name, owner, dna } = punk;

  const { toast, handleSetToast, handleCloseToast } = useToast();

  const platziPunks = usePlatziPunks();

  const isOwner = account === owner;

  const [address, setAddress] = useState("");

  const [transfering, setTransfering] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAddress("");
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const transfer = () => {
    handleClose();

    setTransfering(true);

    const isAddress = library.utils.isAddress(address);

    if (!isAddress) {
      handleSetToast({
        open: true,
        title: "Dirección inválida",
        description: "La dirección no es una dirección de Ethereum",
        status: "error",
      });
      setTransfering(false);
    } else {
      platziPunks.methods
        .safeTransferFrom(punk.owner, address, punk.tokenId)
        .send({
          from: account,
        })
        .on("error", () => {
          setTransfering(false);
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
          setTransfering(false);
          handleSetToast({
            open: true,
            title: "Transacción confirmada",
            description: `El punk ahora pertenece a ${address}`,
            status: "success",
          });
          update();
        });
    }
  };

  if (!active) return <RequestAccess />;

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

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={2}>
          <Typography>
            Aquí podrás transferir tu NFT a otra dirección
          </Typography>
          <Box mt={2}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Introduce la dirección"
              variant="outlined"
              color="primary"
              value={address}
              InputLabelProps={{
                style: {
                  color: alpha("#fff", 0.5),
                },
              }}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <Button
              variant="contained"
              style={{
                borderRadius: 15,
                padding: 10,
                color: "#fff",
              }}
              onClick={transfer}
            >
              Confirmar
            </Button>
            <Button
              variant="text"
              color="error"
              style={{
                borderRadius: 15,
                padding: 10,
                color: "#fff",
              }}
              onClick={handleClose}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Popover>

      <Box my={5}>
        <Container>
          {loading ? (
            <LoadingComponent />
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <PunkCard
                  image={image}
                  name={name}
                  tokenId={tokenId}
                  owner={owner}
                />
                {isOwner && (
                  <Box my={3}>
                    <Box sx={{ m: 1, position: "relative" }}>
                      <Button
                        fullWidth
                        variant="contained"
                        style={{
                          borderRadius: 15,
                          padding: 10,
                          color: transfering ? alpha("#fff", 0.5) : "#fff",
                        }}
                        disabled={transfering}
                        onClick={handleClick}
                      >
                        Transferir
                      </Button>
                      {transfering && (
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
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>
                  {name}
                </Typography>
                <Typography variang="h6">
                  Platzi Punks are randomized Avataaars stored on chain to teach
                  DApp development on Platzi
                </Typography>
                <Box my={3}>
                  <ListItemText primary="DNA" secondary={dna} />
                  <ListItemText primary="OWNER" secondary={owner} />
                </Box>

                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography style={{ fontWeight: "bold" }}>
                            ATRIBUTO
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography style={{ fontWeight: "bold" }}>
                            VALOR
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(punk.attributes).map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell>{key}</TableCell>
                          <TableCell>
                            <Chip label={value} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Punk;
