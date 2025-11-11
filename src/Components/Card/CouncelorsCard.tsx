import React from "react";
import { Paper, Typography, Button, Avatar, useTheme } from "@mui/material";
import { Call as CallIcon } from "@mui/icons-material";

interface CounselorCardProps {
  name: string;
  specialization: string;
  imageUrl: string;
}

const CounselorCard: React.FC<CounselorCardProps> = ({
  name,
  specialization,
  imageUrl,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Paper
      elevation={5}
      sx={{
        borderRadius: "18px",
        p: { xs: 3, md: 4 },
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        bgcolor: isDark ? "#3f5c57" : "#ffffff",
        border: `1px solid ${isDark ? "#2e3d3b" : "#e0e0e0"}`,
        transition: "all 0.35s ease-in-out",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: isDark
            ? "0 10px 20px rgba(255, 255, 255, 0.08)"
            : "0 10px 20px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      {/* Counselor Image */}
      <Avatar
        alt={name}
        src={imageUrl}
        sx={{
          width: 130,
          height: 130,
          mb: 2,
          border: `3px solid ${theme.palette.primary.main}`,
          boxShadow: "0 8px 15px rgba(0, 0, 0, 0.15)",
          objectFit: "cover",
        }}
      />

      {/* Name */}
      <Typography
        variant="h6"
        component="div"
        sx={{
          mt: 1,
          mb: 0.5,
          fontWeight: 700,
          color: isDark ? "#e0f2f1" : "#0e5f87ff",
          fontFamily: "'Cambria', serif",
          letterSpacing: 0.4,
        }}
      >
        {name}
      </Typography>

      {/* Specialization */}
      <Typography
        variant="body2"
        sx={{
          mb: 3,
          color: isDark ? "#b2dfdb" : "#28790aff",
          fontSize: "0.95rem",
          fontWeight: 500,
          letterSpacing: 0.3,
        }}
      >
        {specialization}
      </Typography>

      {/* Book Button */}
      <Button
        variant="contained"
        startIcon={<CallIcon />}
        sx={{
          mt: "auto",
          px: 3.5,
          py: 1.2,
          borderRadius: "30px",
          fontWeight: 700,
          fontSize: "0.9rem",
          letterSpacing: 0.5,
          backgroundColor: "#678e0bff",
          color: "#fff",
          boxShadow: isDark
            ? "0 4px 12px rgba(255, 255, 255, 0.1)"
            : "0 4px 12px rgba(0, 0, 0, 0.15)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.06)",
            boxShadow: isDark
              ? "0 8px 20px rgba(255, 255, 255, 0.2)"
              : "0 8px 20px rgba(0, 0, 0, 0.25)",
            bgcolor: "#ac4040ff",
          },
        }}
        onClick={() => alert(`Appointment booked with ${name}`)}
      >
        Book Appointment
      </Button>
    </Paper>
  );
};

export default CounselorCard;
