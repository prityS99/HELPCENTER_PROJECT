import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../../../lib/supabaseClients';
import type { Appointment, BookingState } from '../../../Typescript/BookingInterface';

// Fetch all appointments
export const fetchAppointments = createAsyncThunk<
  Appointment[],
  void,
  { rejectValue: string }
>(
  'booking/fetchAppointments',
  async (_, thunkAPI) => {
    const { data, error } = await supabase.from('appointments').select('*');
    if (error) return thunkAPI.rejectWithValue(error.message);
    return data ?? [];
  }
);

// Book a new appointment
export const bookAppointment = createAsyncThunk<
  Appointment[],
  Appointment,
  { rejectValue: string }
>(
  'booking/bookAppointment',
  async (appointmentData, thunkAPI) => {
    const { data, error } = await supabase.from('appointments').insert([appointmentData]).select();
    if (error) return thunkAPI.rejectWithValue(error.message);
    return data ?? [];
  }
);

// Initial state
const initialState: BookingState = {
  appointments: [],
  loading: false,
  error: null,
};

// Slice
const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch appointments';
      })

      // Book
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookAppointment.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        state.loading = false;
        state.appointments = [...state.appointments, ...action.payload];
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to book appointment';
      });
  },
});

export default bookingSlice.reducer;
