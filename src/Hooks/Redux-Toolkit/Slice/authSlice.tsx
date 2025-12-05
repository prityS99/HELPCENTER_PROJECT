import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../../lib/supabaseClients";
import { toast } from "sonner";

interface userState {
  user: any;
  token: string | undefined;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  role: "admin" | "user" | null;
}

const initialState: userState = {
  user: null,
  token: "",
  loading: false,
  error: null,
  isAuthenticated: false,
  role: null,
};


async function fetchUserRole(userId: string): Promise<"admin" | "user"> {
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (error || !data?.role) return "user";
  return data.role;
}

// --- SIGNUP Thunk ---
export const signUpThunk = createAsyncThunk(
  "auth/signup",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) return thunkAPI.rejectWithValue(error.message);
      if (!data.user) return thunkAPI.rejectWithValue("User data missing");

      await supabase.from("profiles").upsert({
        id: data.user.id,
        email: data.user.email,
        role: email === "99pritys@gmail.com" ? "admin" : "user",
      });

      toast.success("Signup successful! Please verify your email ✉️");

      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// --- LOGIN Thunk ---
export const logInThunk = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return thunkAPI.rejectWithValue(error.message);

      toast.success("Welcome back 👋");

      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// --- SIGNOUT Thunk ---
export const signOutThunk = createAsyncThunk(
  "auth/signout",
  async (_, thunkAPI) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) return thunkAPI.rejectWithValue(error.message);

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");

      toast.info("You’ve been logged out successfully 👋");

      return null;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// --- GET SESSION Thunk ---
export const getCurrentSession = createAsyncThunk(
  "auth/getSession",
  async (_, thunkAPI) => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) return thunkAPI.rejectWithValue(error.message);
      return session;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- SIGNUP ---
      .addCase(signUpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.session?.access_token;
        state.isAuthenticated = !!action.payload.session;

        if (action.payload.user?.id) {
          fetchUserRole(action.payload.user.id).then((role) => {
            state.role = role;
            localStorage.setItem("role", role);
          });
        }

        localStorage.setItem(
          "token",
          action.payload.session?.access_token || ""
        );
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "Signup failed. Try again ❌");
      })

      // --- LOGIN ---
      .addCase(logInThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logInThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.session?.access_token;
        state.isAuthenticated = true;

        fetchUserRole(action.payload.user.id).then((role) => {
          state.role = role;
          localStorage.setItem("role", role);
        });

        localStorage.setItem(
          "token",
          action.payload.session?.access_token || ""
        );
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(logInThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "Login failed ❌");
      })

      // --- SIGNOUT ---
      .addCase(signOutThunk.fulfilled, (state) => {
        state.user = null;
        state.token = "";
        state.isAuthenticated = false;
        state.role = null;
      })
      .addCase(signOutThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        toast.error("Failed to logout ❌");
      })

      // --- SESSION RESTORE ---
      .addCase(getCurrentSession.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.access_token;
          state.isAuthenticated = true;

          fetchUserRole(action.payload.user.id).then((role) => {
            state.role = role;
            localStorage.setItem("role", role);
          });
        }
      });
  },
});

export const { clearError } = AuthSlice.actions;
export default AuthSlice.reducer;
