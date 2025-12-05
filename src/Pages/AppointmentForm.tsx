import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "sonner";
import bg from "../assets/BookForm/bg.jpg"; 
import Payment from "./Payment";
import PaymentHandler from "./PaymentHandler";
import { supabase } from "../lib/supabaseClients";

const AppointmentForm: React.FC = () => {
  const [patientName, setPatientName] = useState("");
  const [counselor, setCounselor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [openPayment, setOpenPayment] = useState(false);
  const [amount] = useState(500);
  const [openHandler, setOpenHandler] = useState(false);
  const handleConfirmPayment = () => {
    setOpenPayment(false);
    setOpenHandler(true);
  };

  const handlePaymentSuccess = async (response: any) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("appointments").insert([
      {
        user_id: user?.id,
        patient_name: patientName,
        counselor_name: counselor,
        booking_date: date,
        booking_time: time,
        booking_status: "confirmed",
        amount,
        payment_status: "paid",
        payment_method: "razorpay",
        transaction_id: response.razorpay_payment_id,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) toast.error(error.message);
    else toast.success("Appointment booked successfully!");
    setOpenHandler(false); 
  };
  
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bg})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3, 
      }}
    >
      <Paper
        elevation={10} 
        sx={{
          p: { xs: 3, md: 6 }, 
          borderRadius: "16px", 
          maxWidth: "450px", 
          width: "100%",
          bgcolor: "rgba(255, 255, 255, 0.95)", 
          backdropFilter: "blur(5px)",
        }}
      >
        <Typography
          variant="h4" 
          component="h1"
          gutterBottom 
          sx={{
            fontFamily: "'Poppins', sans-serif",
            color: "#25697fff",
            fontWeight: 600,
            textAlign: "center",
            mb: 4,
          }}
        >
          Book Your Session
        </Typography>

        <form
          onSubmit={(e) => {
            e.preventDefault();
           
            if (patientName && counselor && date && time) {
                setOpenPayment(true);
            } else {
                toast.error("Please fill in all appointment details.");
            }
          }}
        >
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Patient Name"
              variant="outlined"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Counselor"
              variant="outlined"
              value={counselor}
              onChange={(e) => setCounselor(e.target.value)}
              required
            />
            <Stack direction="row" spacing={2}> {/* Group date and time */}
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  label="Time"
                  type="time"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
            </Stack>

            <Button
              type="submit"
              variant="contained"
              size="large" 
              sx={{
                mt: 2, 
                bgcolor: "#407a14ff", 
                "&:hover": {
                    bgcolor: "#722909ff",
                }
              }}
            >
              Book & Pay ({amount} INR)
            </Button>
          </Stack>
        </form>
      </Paper>

      {/*  Payment Dialog */}
      <Payment
        open={openPayment}
        amount={amount}
        // loading={false}
        onClose={() => setOpenPayment(false)}
        onConfirm={handleConfirmPayment}
      />

      {/*  Razorpay Logic */}
      <PaymentHandler
        open={openHandler}
        amount={amount}
        patientName={patientName}
        counselor={counselor}
        onSuccess={handlePaymentSuccess}
        onClose={() => setOpenHandler(false)}
      />
    </Box>
  );
};

export default AppointmentForm;


// // ------ RAZORPAY ---- //

// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Paper,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { toast } from "sonner";
// import bg from "../assets/BookForm/bg.jpg";
// import Payment from "./Payment";
// import PaymentHandler from "./PaymentHandler";
// import { supabase } from "../lib/supabaseClients";

// const AppointmentForm: React.FC = () => {
//   const [patientName, setPatientName] = useState("");
//   const [counselor, setCounselor] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [openPayment, setOpenPayment] = useState(false);
//   const [amount] = useState(500);
//   const [openHandler, setOpenHandler] = useState(false);

//   const handleConfirmPayment = () => {
//     setOpenPayment(false);
//     setOpenHandler(true);
//   };

//   const handlePaymentSuccess = async (response: any) => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     const { error } = await supabase.from("appointments").insert([
//       {
//         user_id: user?.id,
//         patient_name: patientName,
//         counselor_name: counselor,
//         booking_date: date,
//         booking_time: time,
//         booking_status: "confirmed",
//         amount,
//         payment_status: "paid",
//         payment_method: "razorpay",
//         transaction_id: response.razorpay_payment_id,
//         created_at: new Date().toISOString(),
//       },
//     ]);

//     if (error) toast.error(error.message);
//     else toast.success("Appointment booked successfully!");
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         backgroundImage: `url(${bg})`,
//         backgroundSize: "cover",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Paper sx={{ p: 4, borderRadius: "40px" }}>
//         <Typography 
//         sx={{fontFamily: "'Poppins', serif", color: "#02476fff", fontSize: "45px", fontWeight: "55px"}}>
//           To be free to book appointment
//         </Typography>

//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             setOpenPayment(true);
//           }}
//         >
//           <Stack spacing={2}>
//             <TextField
//               label="Patient Name"
//               value={patientName}
//               onChange={(e) => setPatientName(e.target.value)}
//             />
//             <TextField
//               label="Counselor"
//               value={counselor}
//               onChange={(e) => setCounselor(e.target.value)}
//             />
//             <TextField
//               label="Date"
//               type="date"
//               InputLabelProps={{ shrink: true }}
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//             <TextField
//               label="Time"
//               type="time"
//               InputLabelProps={{ shrink: true }}
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//             />

//             <Button type="submit" variant="contained">
//               Book & Pay
//             </Button>
//           </Stack>
//         </form>
//       </Paper>

//       {/* 💳 Payment Dialog */}
//       <Payment
//         open={openPayment}
//         amount={amount}
//         loading={false}
//         onClose={() => setOpenPayment(false)}
//         onConfirm={handleConfirmPayment}
//       />

//       {/* ⚡ Razorpay Logic */}
//       <PaymentHandler
//         open={openHandler}
//         amount={amount}
//         patientName={patientName}
//         counselor={counselor}
//         onSuccess={handlePaymentSuccess}
//         onClose={() => setOpenHandler(false)}
//       />
//     </Box>
//   );
// };

// export default AppointmentForm;

