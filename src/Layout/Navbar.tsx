import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../assets/Logo/logo.webp";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { signOutThunk } from "../Hooks/Redux-Toolkit/Slice/authSlice";
import type { AppDispatch } from "../Hooks/Redux-Toolkit/store";



const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDrawerToggle = () => setMobileMenuOpen((prev) => !prev);

  const handleMenuClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
  await dispatch(signOutThunk());
  navigate("/login");
};


  const adminEmail = "99pritys@gmail.com";
  const isAdmin = user?.email === adminEmail;

  const menuItems = [
    { name: "Home", link: "/home" },
    { name: "Counselors List", link: "/counselors" },
    { name: "Therapies", link: "/therapies" },
    { name: "Plans and Pricing", link: "/planspricing" },
    { name: "Contact", link: "/contactus" },
  ];

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        background: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <Container>
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            py: "0.8rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "'Poppins', serif",
          }}
        >
          {/* Logo */}
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="logo" style={{ width: "100px" }} />
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.link;
              return (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.link}
                  sx={{
                    position: "relative",
                    color: isActive ? "#8dc135" : "#2E2E2E",
                    fontWeight: isActive ? 600 : 650,
                    fontFamily: "'Poppins', serif",
                    textTransform: "none",
                    "&:hover": {
                      color: "#8dc135",
                      background: "transparent",
                    },
                  }}
                >
                  {item.name}
                </Button>
              );
            })}
          </Box>

          {/* Right Buttons */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {!isAuthenticated && (
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#678e0bff",
                  textTransform: "none",
                   fontFamily: "'Poppins', serif",
                  "&:hover": { bgcolor: "#ac4040ff" },
                }}
                onClick={() => navigate("/login")}
              >
                Appointment
              </Button>
            )}

            {isAuthenticated && (
              <>
                {isAdmin && (
                  <Button
                    variant="outlined"
                    component={Link}
                    to="/admin"
                    sx={{
                      color: "#678e0b",
                      borderColor: "#678e0b",
                       fontFamily: "'Poppins', serif",
                      textTransform: "none",
                      "&:hover": { bgcolor: "rgba(103,142,11,0.1)" },
                    }}
                  >
                    Admin
                  </Button>
                )}
                {!isAdmin && (
                  <Button
                    variant="contained"
                    component={Link}
                    to="/appointment"
                    sx={{
                      bgcolor: "#678e0bff",
                       fontFamily: "'Poppins', serif",
                      textTransform: "none",
                      "&:hover": { bgcolor: "#ac4040ff" },
                    }}
                  >
                    Appointment
                  </Button>
                )}

                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  sx={{
                    color: "#f57474",
                    borderColor: "#f57474",
                    textTransform: "none",
                    "&:hover": { bgcolor: "rgba(245,116,116,0.1)" },
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Menu Toggle */}
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div key="close">
                  <CloseIcon sx={{ fontSize: "2rem", color: "#2E2E2E" }} />
                </motion.div>
              ) : (
                <motion.div key="menu">
                  <MenuIcon sx={{ fontSize: "2rem", color: "#2E2E2E" }} />
                </motion.div>
              )}
            </AnimatePresence>
          </IconButton>
        </Box>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: 240,
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
             fontFamily: "'Poppins', serif",
            zIndex: 1200,
            px: 2,
            pt: 2,
          },
        }}
      >
        {/* Top Right Close Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Search Placeholder */}
        <Box sx={{ mb: 2 }}>
          <input
            type="text"
            placeholder="Search…"
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "1rem",
              fontFamily: "'Poppins', serif",
            }}
          />
        </Box>

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={() => handleMenuClick(item.link)}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}

          
          <Box sx={{ mt: 2, textAlign: "center" }}>
            {!isAuthenticated ? (
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  handleMenuClick("/login");
                }}
                sx={{
                  bgcolor: "#678e0bff",
                  fontFamily: "'Poppins', serif",
                  color: "white",
                  "&:hover": { bgcolor: "#ac4040ff" },
                }}
              >
                Appointment
              </Button>
            ) : (
              <>
                {isAdmin && (
                  <Button
                    fullWidth
                    variant="outlined"
                    component={Link}
                    to="/admin"
                    onClick={handleDrawerToggle}
                    sx={{
                      color: "#678e0b",
                       fontFamily: "'Poppins', serif",
                      borderColor: "#678e0b",
                      mb: 1,
                    }}
                  >
                    Admin
                  </Button>
                )}
                {!isAdmin && (
                  <Button
                    fullWidth
                    variant="contained"
                    component={Link}
                    to="/appointment"
                    onClick={handleDrawerToggle}
                    sx={{
                      bgcolor: "#678e0bff",
                       fontFamily: "'Poppins', serif",
                      color: "white",
                      mb: 1,
                      "&:hover": { bgcolor: "#ac4040ff" },
                    }}
                  >
                    Appointment
                  </Button>
                )}

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    handleLogout();
                    handleDrawerToggle();
                  }}
                  sx={{
                    color: "#f57474",
                     fontFamily: "'Poppins', serif",
                    borderColor: "#f57474",
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;

