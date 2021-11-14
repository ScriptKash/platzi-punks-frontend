import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";

import {
  Grid,
  Container,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  alpha,
  FormHelperText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PunkCard from "../../components/card";

import { usePlatziPunksData } from "../../hooks/usePlatziPunksData";
import RequestAccess from "../../components/request-access";
import LoadingComponent from "../../components/loading";

const Punks = () => {
  const { search } = useLocation();

  const [address, setAddress] = useState(
    new URLSearchParams(search).get("address")
  );

  const [submitted, setSubmitted] = useState(true);

  const [validAddress, setValidAddress] = useState(true);

  const navigate = useNavigate();

  const { active, library } = useWeb3React();

  const { punks, loading } = usePlatziPunksData({
    owner: submitted && validAddress ? address : null,
  });

  const handleAddressChange = ({ target: { value } }) => {
    setAddress(value);
    setSubmitted(false);
    setValidAddress(false);
  };

  const submit = (event) => {
    event.preventDefault();

    if (address) {
      const isValid = library.utils.isAddress(address);
      setValidAddress(isValid);
      setSubmitted(true);
      if (isValid) navigate(`/punks?address=${address}`);
    } else {
      navigate("/punks");
    }
  };

  if (!active) return <RequestAccess />;

  return (
    <>
      <Box
        style={{
          backgroundColor: "#24385b",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box>
          <Box p={3} display="flex" alignItems="center" height={300}>
            <Box position="relative" zIndex={1}>
              <Typography variant="h3" style={{ fontWeight: 900 }}>
                Platzi Punks
              </Typography>
              <Typography variant="h5">
                Conoce la gran variedad de NFT que tenemos para ti
              </Typography>
            </Box>
          </Box>
          <img
            src={"https://avataaars.io/"}
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
        </Box>
      </Box>
      <Box my={5}>
        <Container>
          <Box mb={2} display="flex" justifyContent="flex-end">
            <form onSubmit={submit}>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                <InputLabel
                  style={{ color: alpha("#fff", 0.5) }}
                  htmlFor="standard-adornment-password"
                >
                  Buscar por dirección
                </InputLabel>
                <Input
                  disabled={loading}
                  error={submitted && !validAddress}
                  id="standard-adornment-password"
                  type="text"
                  value={address ?? ""}
                  onChange={handleAddressChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        disabled={loading}
                        aria-label="submit address"
                        type="submit"
                      >
                        <SearchIcon style={{ color: "#fff" }} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {submitted && !validAddress && (
                  <FormHelperText style={{ color: alpha("#ff0000", 0.5) }}>
                    Dirección inválida
                  </FormHelperText>
                )}
              </FormControl>
            </form>
          </Box>
          {loading ? (
            <LoadingComponent punks />
          ) : (
            <>
              <Grid container spacing={1}>
                {punks.map(({ name, image, tokenId, owner }) => (
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
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Punks;
