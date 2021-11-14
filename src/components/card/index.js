import React, { useState } from "react";
import { Card, Box, Typography, Chip, CardContent } from "@mui/material";
import { useWeb3React } from "@web3-react/core";

const PunkCard = ({ image, name, tokenId, owner, ...props }) => {
  const { account } = useWeb3React();

  const [isShown, setIsShown] = useState(false);

  const isOwner = account === owner;

  return (
    <Card
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      style={{
        transition: "all 0.3s ease-in",
        backgroundColor: isShown ? "#1e2f4d" : "#24385b",
        borderRadius: 15,
      }}
    >
      <CardContent>
        <Box textAlign="center">
          <img src={image} alt={name} />
          <Typography
            variant="h6"
            style={{ color: "#fff", fontWeight: "bold" }}
          >
            {name}
          </Typography>
          <Box
            mt={2}
            textAlign="center"
          >
            <Chip
              color={isOwner ? "primary" : "default"}
              label={isOwner ? "Eres el dueño" : "No eres el dueño"}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PunkCard;
