import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "../../../lib/supabaseClients";
import type { PaymentData, PaymentState } from "../../../Typescript/PaymentInterface";

// 1️⃣ Create Order (from backend)
export const createOrder = createAsyncThunk<
  any,
  { amount: number; currency?: string },
  { rejectValue: string }
>("payment/createOrder", async ({ amount, currency = "INR" }, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, currency }),
    });
    if (!res.ok) throw new Error("Failed to create Razorpay order");
    return await res.json();
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// 2️⃣ Verify Payment (backend verification + Supabase insert)
export const verifyAndSavePayment = createAsyncThunk<
  PaymentData,
  {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    user_id?: string;
    amount: number;
  },
  { rejectValue: string }
>("payment/verifyAndSavePayment", async (payload, thunkAPI) => {
  try {
    // Verify on backend
    const verifyRes = await fetch("http://localhost:5000/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await verifyRes.json();

    if (!result.success) throw new Error("Payment verification failed");

    // Save payment in Supabase
    const { data, error } = await supabase.from("payments").insert([
      {
        user_id: payload.user_id,
        amount: payload.amount,
        payment_status: "success",
        payment_method: "razorpay",
        transaction_id: payload.razorpay_payment_id,
        order_id: payload.razorpay_order_id,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) throw new Error(error.message);
    return data[0] as PaymentData;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const initialState: PaymentState = {
  loading: false,
  error: null,
  currentPayment: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPayment: (state) => {
      state.currentPayment = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPayment = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create order";
      })
      .addCase(verifyAndSavePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPayment = action.payload;
      })
      .addCase(verifyAndSavePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Payment verification failed";
      });
  },
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
