import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";

import { supabase } from "../../lib/supabaseClients";
import type { AppDispatch } from "../../Hooks/Redux-Toolkit/store";
import { addCounselor } from "../../Hooks/Redux-Toolkit/Slice/counselorSlice";

const categories = [
  "Clinical",
  "Counseling",
  "Child",
  "Family",
  "Marriage",
  "Anxiety",
  "Career",
];

const AddCounselor: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    degree: "",
    category: "",
    available_date: "",
    available_time: "",
    imageFile: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "imageFile" && files) {
      setFormData({ ...formData, imageFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let image_url = "";

      // 🖼️ Upload image to Supabase bucket
      if (formData.imageFile) {
        const fileName = `${Date.now()}_${formData.imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("counselors_img")
          .upload(fileName, formData.imageFile);

        if (uploadError) throw uploadError;

        const { data: publicUrl } = supabase.storage
          .from("counselors_img")
          .getPublicUrl(fileName);

        image_url = publicUrl.publicUrl;
      }

      // 📦 Prepare payload
      const payload = {
        name: formData.name,
        specialization: formData.specialization,
        degree: formData.degree,
        category: formData.category,
        available_date: formData.available_date,
        available_time: formData.available_time,
        image_url,
      };

      // 🧠 Dispatch Redux action to add counselor
      await dispatch(addCounselor(payload)).unwrap();

      alert("Counselor added successfully!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        specialization: "",
        degree: "",
        category: "",
        available_date: "",
        available_time: "",
        imageFile: null,
      });
    } catch (error: any) {
      alert(`Failed to add counselor: ${error.message}`);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f6fafb",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
            bgcolor: "#fff",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color={theme.palette.primary.main}
            textAlign="center"
            mb={4}
          >
            Add New Counselor
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {[
                { label: "Full Name", name: "name" },
                { label: "Email", name: "email" },
                { label: "Specialization", name: "specialization" },
                { label: "Degree", name: "degree" },
              ].map((field) => (
                <Grid item xs={12} sm={6} key={field.name}>
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              ))}

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Available Date"
                  name="available_date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.available_date}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Available Time"
                  name="available_time"
                  value={formData.available_time}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                  }}
                >
                  Upload Counselor Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    name="imageFile"
                    onChange={handleChange}
                  />
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    py: 1.5,
                    backgroundColor: "#2e7d32",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#1b5e20" },
                  }}
                >
                  Add Counselor
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default AddCounselor;
