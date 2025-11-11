import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Stack,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import bg from "../assets/Login/login bg.png";
import type { AppDispatch, RootState } from "../Hooks/Redux-Toolkit/store";
import { logInThunk } from "../Hooks/Redux-Toolkit/Slice/authSlice";
import { supabase } from "../lib/supabaseClients";

type LoginFormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  // 🔹 Login handler
  const onSubmit = async (data: LoginFormData) => {
    const result = await dispatch(logInThunk(data));

    if (logInThunk.fulfilled.match(result)) {
      const { role } = result.payload;
      toast.success("Logged in successfully!");

      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/appointment");
        }
      }, 800);
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  // 🔹 Forgot password handler
  const handleResetPassword = async () => {
    if (!resetEmail) {
      toast.error("Please enter your email first.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: "http://localhost:5173/reset-password", // change as needed
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset link sent! Check your email inbox.");
      setShowForgotPassword(false);
      setResetEmail("");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ✨ Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(10,19,22,0.75)",
          zIndex: 1,
        }}
      />

      {/* ✨ Animated Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ zIndex: 2, width: "90%", maxWidth: 420 }}
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 10px rgba(216,130,64,0.3)",
              "0 0 25px rgba(103, 206, 238, 0.6)",
              "0 0 10px rgba(98, 154, 227, 0.6)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          style={{
            background: "rgba(25,36,40,0.95)",
            borderRadius: "12px",
            padding: "2.5rem",
            backdropFilter: "blur(8px)",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            mb={2}
            sx={{
              fontFamily: "'Poppins', serif",
              color: "#a8e8efff", letterSpacing: "1px"
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            align="center"
            mb={3}
            sx={{
              fontFamily: "'Poppins', serif",
              fontSize: "15px",
              color: "rgba(255,255,255,0.75)"
            }}
          >
            Log in to continue your journey
          </Typography>

          {/* 🌿 Login Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                label="Email"
                variant="filled"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon sx={{ color: "#3a852aff" }} />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                }}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{
                  backgroundColor: "#0a1316",
                  "& .MuiInputBase-input": { color: "white" },
                  "& .MuiFormLabel-root": { color: "#aaa" },
                }}
              />

              <TextField
                {...register("password", { required: "Password is required" })}
                label="Password"
                type="password"
                variant="filled"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: "#3a852aff" }} />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                }}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{
                  backgroundColor: "#0a1316",
                  "& .MuiInputBase-input": { color: "white" },
                  "& .MuiFormLabel-root": { color: "#aaa" },
                }}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
              <Dialog
                open={showForgotPassword}
                onClose={() => setShowForgotPassword(false)}
                PaperProps={{
                  sx: {
                    backgroundColor: "rgba(25,36,40,0.95)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "12px",
                    color: "white",
                    p: 2,
                    boxShadow: "0 0 25px rgba(103,206,238,0.4)",
                  },
                }}
              >
                <DialogTitle
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#a8e8ef",
                    pb: 1,
                  }}
                >
                  Reset Password
                </DialogTitle>

                <DialogContent>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.75)",
                      textAlign: "center",
                      mb: 2,
                    }}
                  >
                    Enter your email to receive a password reset link
                  </Typography>

                  <TextField
                    fullWidth
                    variant="filled"
                    placeholder="youremail@example.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    InputProps={{ disableUnderline: true }}
                    sx={{
                      backgroundColor: "#0a1316",
                      borderRadius: "6px",
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiInputLabel-root": { color: "#aaa" },
                    }}
                  />
                </DialogContent>

                <DialogActions
                  sx={{
                    justifyContent: "center",
                    pb: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleResetPassword}
                    sx={{
                      backgroundColor: "#3a852aff",
                      "&:hover": { backgroundColor: "#f57474ff" },
                      fontWeight: "bold",
                      px: 3,
                    }}
                  >
                    Send Link
                  </Button>
                </DialogActions>
              </Dialog>


              <Box textAlign="center">
                <Link
                  underline="hover"
                  sx={{
                    color: "#6fb0f5",
                    cursor: "pointer",
                    fontSize: 14,
                    "&:hover": { color: "#d1747dff" },
                  }}
                  onClick={() => setShowForgotPassword(!showForgotPassword)}
                >
                  Forgot Password?
                </Link>
              </Box>

              {error && (
                <Typography
                  variant="body2"
                  color="error"
                  align="center"
                  sx={{ mt: 1 }}
                >
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 2,
                  backgroundColor: "#54a229ff",
                  fontWeight: "bold",
                  py: 1.2,
                  borderRadius: "6px",
                  "&:hover": { backgroundColor: "#991a1aff" },
                }}
              >
                {loading ? "Signing in..." : "Login"}
              </Button>
            </Stack>
          </form>

          {/* 🌿 Forgot Password Section */}
          {showForgotPassword && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ marginTop: "1.5rem" }}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: "#a8e8ef", mb: 1, textAlign: "center" }}
              >
                Enter your email to reset password
              </Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="youremail@example.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  sx={{
                    backgroundColor: "#0a1316",
                    "& .MuiInputBase-input": { color: "white" },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleResetPassword}
                  sx={{
                    backgroundColor: "#3a852aff",
                    "&:hover": { backgroundColor: "#f57474ff" },
                    whiteSpace: "nowrap",
                  }}
                >
                  Send Link
                </Button>
              </Stack>
            </motion.div>
          )}

          {/* Signup Link */}
          <Box textAlign="center" mt={3}>
            <Typography variant="body2" sx={{ color: "white" }}>
              Don’t have an account?{" "}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/signup")}
                sx={{
                  color: "#1b7791ff",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  "&:hover": { color: "#f59e47" },
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default Login;
