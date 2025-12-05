import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PaymentSuccess: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  return (
    <Box
      textAlign="center"
      p={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant="h5">Payment Successful!</Typography>
      <Typography variant="body1" mt={1}>
        Your appointment has been booked successfully.
      </Typography>
      <Button sx={{ mt: 3 }} variant="contained" onClick={onBack}>
        Back to Home
      </Button>
    </Box>
  );
};

export default PaymentSuccess;
