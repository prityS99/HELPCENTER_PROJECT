import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Stack,
  Avatar,
  Link,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import bg from "../assets/Signup/bg.jpg";
import { supabase } from "../lib/supabaseClients";
import type { AppDispatch } from "../Hooks/Redux-Toolkit/store";

type SignupFormData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);

      // Step 1: Sign up user
      const { data: signupData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      const user = signupData.user;
      console.log("user", user);
      
      if (!user) throw new Error("No user returned from signup");

      
      let avatar_url = null;
      if (avatarFile) {
        const { data: storageData, error: storageError } =
          await supabase.storage
            .from("profile_image")
            .upload(`public/${user.id}/${avatarFile.name}`, avatarFile, {
              cacheControl: "3600",
              upsert: true,
            });

        if (storageError) throw storageError;

        const { data: publicUrlData } = supabase.storage
          .from("profile_image")
          .getPublicUrl(storageData.path);
        avatar_url = publicUrlData.publicUrl;
      }

      // Step 3: Insert profile into profiles table
      const { error: insertError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          avatar_url,
        },
      ]);

      if (insertError) throw insertError;

          const { error: loginError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    
      // alert("Signup successful! Please verify your email before logging in.");
      // navigate("/");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
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
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(10,19,22,0.75)",
          zIndex: 1,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ zIndex: 2, width: "90%", maxWidth: 450 }}
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 10px rgba(216,130,64,0.3)",
              "0 0 25px rgba(64, 201, 216, 0.6)",
              "0 0 10px rgba(64, 168, 216, 0.3)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
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
            sx={{ fontFamily: "'Poppins', serif",color: "#4caccfff" }}
          >
            Create Account
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <TextField
                  {...register("first_name", { required: "First name is required" })}
                  label="First Name"
                  variant="filled"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon sx={{ color: "#2f6908ff" }} />
                      </InputAdornment>
                    ),
                    disableUnderline: true,
                  }}
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                  sx={{
                    backgroundColor: "#0a1316",
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiFormLabel-root": { color: "#aaa" },
                  }}
                />

                <TextField
                  {...register("last_name", { required: "Last name is required" })}
                  label="Last Name"
                  variant="filled"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon sx={{ color: "#479514ff" }} />
                      </InputAdornment>
                    ),
                    disableUnderline: true,
                  }}
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                  sx={{
                    backgroundColor: "#0a1316",
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiFormLabel-root": { color: "#aaa" },
                  }}
                />
              </Stack>

              <TextField
                {...register("email", { required: "Email is required" })}
                label="Email"
                variant="filled"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon sx={{ color: "#479514ff" }} />
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
                      <LockOutlinedIcon sx={{ color: "#479514ff" }} />
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

              {/* Profile Picture */}
              {/* <Stack alignItems="center" spacing={2}>
                <Avatar
                  src={avatarPreview || ""}
                  sx={{ width: 80, height: 80, border: "2px solid #d68240" }}
                />
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    color: "#1b96a6ff",
                    borderColor: "#69cfceff",
                    "&:hover": { borderColor: "#b86e26" },
                  }}
                >
                  Upload Profile Picture
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleAvatarChange}
                  />
                </Button>
              </Stack> */}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 2,
                  backgroundColor: "#1b8019ff",
                  fontWeight: "bold",
                  py: 1.2,
                  borderRadius: "6px",
                  "&:hover": { backgroundColor: "#9a1e1eff" },
                }}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </Stack>
          </form>

          <Box textAlign="center" mt={3}>
            <Typography variant="body2" sx={{ color: "white" }}>
              Already have an account?{" "}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/login")}
                sx={{
                  color: "#40b8d6ff",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  "&:hover": { color: "#953631ff" },
                }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default Signup;
