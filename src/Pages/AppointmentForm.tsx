import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "sonner";
import bg from "../assets/BookForm/bg.jpg";
import { supabase } from "../lib/supabaseClients";

const AppointmentForm: React.FC = () => {
  const [patientName, setPatientName] = useState("");
  const [counselor, setCounselor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  // 👉 Razorpay script loader
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpay();
    if (!res) {
      toast.error("Razorpay SDK failed to load.");
      return;
    }

    const amount = 500; // 💰 you can make this dynamic later

    const options = {
      key: "rzp_test_YourKeyID", // Replace with your Razorpay key
      amount: amount * 100, // in paise
      currency: "INR",
      name: "MindEase Counseling",
      description: "Appointment Payment",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6a/Razorpay_logo.svg",
      handler: async function (response: any) {
        // After successful payment, save to Supabase
        await saveAppointment(response);
      },
      prefill: {
        name: patientName,
        email: "user@example.com",
        contact: "9999999999",
      },
      notes: {
        counselor_name: counselor,
      },
      theme: { color: "#3399cc" },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  const saveAppointment = async (paymentResponse: any) => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const user_id = user?.id || null;

    const { error } = await supabase.from("appointments").insert([
      {
        user_id,
        patient_name: patientName,
        counselor_name: counselor,
        booking_date: date,
        booking_time: time,
        booking_status: "confirmed",
        amount: 500,
        payment_status: "paid",
        payment_method: "razorpay",
        transaction_id: paymentResponse.razorpay_payment_id,
        created_at: new Date().toISOString(),
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      toast.error(error.message || "Failed to save appointment");
    } else {
      toast.success("Appointment booked & payment successful!");
      setPatientName("");
      setCounselor("");
      setDate("");
      setTime("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !counselor || !date || !time) {
      toast.error("Please fill all details");
      return;
    }
    await handlePayment();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(10,19,22,0.75)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Paper
          elevation={8}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: "12px",
            maxWidth: "500px",
            width: "100%",
            backgroundColor: "rgba(227, 233, 236, 0.9)",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Book an Appointment
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Patient Name"
                variant="filled"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                InputProps={{ disableUnderline: true }}
                sx={{
                  backgroundColor: "#0a1316",
                  borderRadius: "4px",
                  "& .MuiInputBase-input": { color: "white" },
                }}
              />

              <TextField
                label="Counselor Name"
                variant="filled"
                required
                value={counselor}
                onChange={(e) => setCounselor(e.target.value)}
                InputProps={{ disableUnderline: true }}
                sx={{
                  backgroundColor: "#0a1316",
                  borderRadius: "4px",
                  "& .MuiInputBase-input": { color: "white" },
                }}
              />

              <TextField
                label="Booking Date"
                type="date"
                variant="filled"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{ disableUnderline: true }}
                sx={{
                  backgroundColor: "#0a1316",
                  borderRadius: "4px",
                  "& .MuiInputBase-input": { color: "white" },
                }}
              />

              <TextField
                label="Booking Time"
                type="time"
                variant="filled"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{ disableUnderline: true }}
                sx={{
                  backgroundColor: "#0a1316",
                  borderRadius: "4px",
                  "& .MuiInputBase-input": { color: "white" },
                }}
              />

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  fullWidth
                  sx={{
                    backgroundColor: "#678e0bff",
                    py: 1.5,
                    fontWeight: "bold",
                    borderRadius: "6px",
                    "&:hover": { backgroundColor: "#ac4040ff" },
                  }}
                >
                  {loading ? "Processing..." : "Book & Pay"}
                </Button>
              </motion.div>
            </Stack>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default AppointmentForm;




// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Paper,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import { toast } from "sonner";
// import bg from "../assets/BookForm/bg.jpg";
// import { supabase } from "../lib/supabaseClients";

// const AppointmentForm: React.FC = () => {
//   const [patientName, setPatientName] = useState("");
//   const [counselor, setCounselor] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // Get logged-in user (optional)
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     const user_id = user?.id || null;

//     // Insert into Supabase
//     const { error } = await supabase.from("appointments").insert([
//       {
//         user_id,
//         patient_name: patientName,
//         counselor_name: counselor,
//         booking_date: date,
//         booking_time: time,
//         booking_status: "pending",
//       },
//     ]);

//     setLoading(false);

//     if (error) {
//       console.error(error);
//       toast.error(error.message || "Failed to book appointment");
//     } else {
//       toast.success("Appointment booked successfully!");
//       setPatientName("");
//       setCounselor("");
//       setDate("");
//       setTime("");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         backgroundImage: `url(${bg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundColor: "rgba(10,19,22,0.75)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         p: 2,
//       }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//       >
//         <Paper
//           elevation={8}
//           sx={{
//             p: { xs: 4, md: 6 },
//             borderRadius: "12px",
//             maxWidth: "500px",
//             width: "100%",
//             backgroundColor: "rgba(227, 233, 236, 0.9)",
//           }}
//         >
//           <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
//             Book an Appointment
//           </Typography>

//           <form onSubmit={handleSubmit}>
//             <Stack spacing={3}>
//               {/* Patient Name */}
//               <TextField
//                 label="Patient Name"
//                 variant="filled"
//                 required
//                 value={patientName}
//                 onChange={(e) => setPatientName(e.target.value)}
//                 InputProps={{ disableUnderline: true }}
//                 sx={{
//                   backgroundColor: "#0a1316",
//                   borderRadius: "4px",
//                   "& .MuiInputBase-input": { color: "white" },
//                   "& .MuiInputLabel-root": { color: "grey.400" },
//                 }}
//               />

//               {/* Counselor Name */}
//               <TextField
//                 label="Counselor Name"
//                 variant="filled"
//                 required
//                 value={counselor}
//                 onChange={(e) => setCounselor(e.target.value)}
//                 InputProps={{ disableUnderline: true }}
//                 sx={{
//                   backgroundColor: "#0a1316",
//                   borderRadius: "4px",
//                   "& .MuiInputBase-input": { color: "white" },
//                   "& .MuiInputLabel-root": { color: "grey.400" },
//                 }}
//               />

//               {/* Booking Date */}
//               <TextField
//                 label="Booking Date"
//                 type="date"
//                 variant="filled"
//                 required
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 InputProps={{ disableUnderline: true }}
//                 sx={{
//                   backgroundColor: "#0a1316",
//                   borderRadius: "4px",
//                   "& .MuiInputBase-input": { color: "white" },
//                   "& .MuiInputLabel-root": { color: "grey.400" },
//                 }}
//               />

//               {/* Booking Time */}
//               <TextField
//                 label="Booking Time"
//                 type="time"
//                 variant="filled"
//                 required
//                 value={time}
//                 onChange={(e) => setTime(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 InputProps={{ disableUnderline: true }}
//                 sx={{
//                   backgroundColor: "#0a1316",
//                   borderRadius: "4px",
//                   "& .MuiInputBase-input": { color: "white" },
//                   "& .MuiInputLabel-root": { color: "grey.400" },
//                 }}
//               />

//               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   disabled={loading}
//                   fullWidth
//                   sx={{
//                     backgroundColor: "#678e0bff",
//                     py: 1.5,
//                     fontWeight: "bold",
//                     borderRadius: "6px",
//                     "&:hover": { backgroundColor: "#ac4040ff" },
//                   }}
//                 >
//                   {loading ? "Booking..." : "Book Appointment"}
//                 </Button>
//               </motion.div>
//             </Stack>
//           </form>
//         </Paper>
//       </motion.div>
//     </Box>
//   );
// };

// export default AppointmentForm;
