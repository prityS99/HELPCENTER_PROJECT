import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { signOutThunk } from "../../Hooks/Redux-Toolkit/Slice/authSlice";
import { Link, useNavigate } from "react-router-dom";

const NavbarAdmin = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(signOutThunk());
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "white",
        color: "#2E2E2E",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: { xs: 2, sm: 3 },
        }}
      >
        {/* Left section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={toggleSidebar} edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: "1rem", sm: "1.2rem" },
            }}
          >
            Admin Dashboard
          </Typography>
        </Box>

        {/* Logout */}
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            color: "#f57474",
            borderColor: "#f57474",
            textTransform: "none",
            "&:hover": { bgcolor: "rgba(245,116,116,0.1)" },
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
          }}
        >
          Logout
        </Button>

        {/* <Button component={Link} to="/admin/add-counselor">
          Add Counselor
        </Button> */}

      </Toolbar>
    </AppBar>
  );
};

export default NavbarAdmin;
