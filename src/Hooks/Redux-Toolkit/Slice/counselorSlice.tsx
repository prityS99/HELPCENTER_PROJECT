import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../lib/supabaseClients";

interface Counselor {
  id?: string;
  name: string;
  email: string;
  specialization: string;
  degree: string;
  category: string;
  available_date: string;
  available_time: string;
  image_url: string;
}

interface CounselorState {
  counselors: Counselor[];
  loading: boolean;
  error: string | null;
}

const initialState: CounselorState = {
  counselors: [],
  loading: false,
  error: null,
};

// ✅ Fetch all counselors
export const fetchCounselors = createAsyncThunk(
  "counselors/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("counselors").select("*").order("id", { ascending: true });
      if (error) throw error;
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Add new counselor
export const addCounselor = createAsyncThunk(
  "counselors/add",
  async (newCounselor: Omit<Counselor, "id">, { rejectWithValue }) => {
    try {
      console.log("redux data", )
      const { data, error } = await supabase.from("counselors").insert([newCounselor]).select();
      if (error) throw error;
      return data[0];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const counselorSlice = createSlice({
  name: "counselors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCounselors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCounselors.fulfilled, (state, action) => {
        state.loading = false;
        state.counselors = action.payload;
      })
      .addCase(fetchCounselors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add
     builder
      // Fetch
      .addCase(addCounselor.pending, (state) => {
        state.loading = true;
      })  
      .addCase(addCounselor.fulfilled, (state, action) => {
        state.counselors.push(action.payload);
      })
      .addCase(addCounselor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export default counselorSlice.reducer;
