import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  DialogActions,
  CircularProgress, 
} from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../Hooks/Redux-Toolkit/store";
import { createOrder } from "../Hooks/Redux-Toolkit/Slice/paymentslice"; 

interface PaymentDialogProps {
  open: boolean;
  amount: number;
  onClose: () => void;
  onConfirm: () => void; 
}

const Payment: React.FC<PaymentDialogProps> = ({
  open,
  amount,
  onClose,
  onConfirm,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  
 
  const [isButtonLoading, setIsButtonLoading] = React.useState(false);


  const handlePayNow = () => {
   
    setIsButtonLoading(true); 

    
    dispatch(createOrder({ amount: amount, currency: "INR" }))
      .unwrap()
      .then(() => {

        onConfirm(); 
        onClose();  
      })
      .catch((error) => {
      
        console.error("Order creation failed:", error);
        alert("Payment initialization failed. Please try again.");
      })
      .finally(() => {
        setIsButtonLoading(false); 
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, color: "#1976D2" }}>Confirm Appointment & Payment</DialogTitle>
      <DialogContent dividers>
        <Typography variant="h5" gutterBottom>
          Total Amount Due
        </Typography>
        <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
          ₹{amount}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          This payment will secure your appointment slot.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="error" disabled={isButtonLoading}>
          Cancel
        </Button>
        <Button
          onClick={handlePayNow}
          disabled={isButtonLoading}
          variant="contained"
          color="success"
          endIcon={isButtonLoading && <CircularProgress size={20} color="inherit" />}
          sx={{ minWidth: 120 }}
        >
          {isButtonLoading ? "Initiating..." : `Pay Now (₹${amount})`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Payment;