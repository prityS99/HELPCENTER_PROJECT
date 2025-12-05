import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../lib/supabaseClients";
import type { Payment } from "../../../Typescript/PaymentInterface";


// Create Razorpay order
export const createOrder = createAsyncThunk(
  "payment/createOrder",
  async (amount: number, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency: "INR" }),
      });
      return await res.json();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Verify payment & insert into Supabase
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (payload: any, thunkAPI) => {
    try {
      const { orderResponse, response, booking_id, amount } = payload;

      // Verify signature
      const verifyRes = await fetch("http://localhost:5000/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) throw new Error("Payment verification failed");

      // Insert into Supabase payments
      const { error } = await supabase.from("payments").insert([
        {
          booking_id,
          amount,
          payment_status: "success",
          payment_method: "Razorpay",
          transaction_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
        },
      ]);
      if (error) throw error;

      return { booking_id, amount, payment_status: "success" };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    payments: [] as Payment[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.payments.push(action.payload as Payment);
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default paymentSlice.reducer;
