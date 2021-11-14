import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Chip, Typography, Box } from "@mui/material";

import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import AddIcon from "@mui/icons-material/Add";
import { connector } from "../../config/web3";

import useTruncatedAddress from "../../hooks/useTruncatedAddress";

const Wallet = () => {
  const navigate = useNavigate();

  const [balance, setBalance] = useState(0);

  const { active, activate, deactivate, account, error, library } =
    useWeb3React();

  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem("previouslyConnected", "true");
  }, [activate]);

  const handleClick = () => {
    navigate(`/punks?address=${account}`);
  };

  const disconnect = () => {
    deactivate();
    localStorage.removeItem("previouslyConnected");
  };

  const getBalance = useCallback(async () => {
    const toSet = await library.eth.getBalance(account);
    setBalance((toSet / 1e18).toFixed(2));
  }, [library?.eth, account]);

  useEffect(() => {
    if (active) getBalance();
  }, [active, getBalance]);

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect();
  }, [connect]);

  const truncatedAddress = useTruncatedAddress(account);

  return (
    <>
      {active ? (
        <Chip
          color="success"
          variant="outlined"
          label={
            <Box display="flex" alignItems="center">
              <Typography variant="body2" style={{ color: "#fff" }}>
                {truncatedAddress}
              </Typography>
              <Chip
                style={{ marginLeft: 5, cursor: "pointer" }}
                label={
                  <Typography
                    style={{ color: "#2e7d32", fontWeight: "bold" }}
                    variant="body2"
                  >
                    ~{balance} Ξ
                  </Typography>
                }
                size="small"
              />
            </Box>
          }
          onClick={handleClick}
          onDelete={disconnect}
        />
      ) : (
        <Button
          startIcon={<AddIcon />}
          onClick={connect}
          color="success"
          variant="contained"
          size="small"
          disabled={isUnsupportedChain}
          style={{
            color: "#fff",
            borderRadius: 10,
            padding: 8,
            fontWeight: "bold",
          }}
        >
          {isUnsupportedChain ? "Red no soportada" : "Conectar Wallet"}
        </Button>
      )}
    </>
  );
};

export default Wallet;
