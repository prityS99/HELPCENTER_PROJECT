import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import HealingIcon from "@mui/icons-material/Healing";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const SidebarAdmin = ({ open }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", link: "/admin/dashboard", icon: <DashboardIcon /> },
    { name: "Counselors", link: "/admin/councelors", icon: <PeopleIcon /> },
    { name: "Therapies", link: "/admin/therapies", icon: <HealingIcon /> },
  ];

  return (
    <motion.div
      animate={{ width: open ? 220 : 70 }}
      transition={{ duration: 0.3 }}
      style={{
        background: "white",
        borderRight: "1px solid rgba(0,0,0,0.1)",
        height: "100vh",
        overflow: "hidden",
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: 1100,
      }}
    >
      {/* Logo / Title */}
      <Box
        sx={{
          py: 2,
          textAlign: "center",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            color: "#678e0b",
            fontSize: open ? "1rem" : "1.5rem",
          }}
        >
          {open ? "Admin Panel" : "A"}
        </Typography>
      </Box>

      {/* Menu Links */}
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.link;
          return (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={Link}
                to={item.link}
                sx={{
                  px: 2,
                  py: 1.5,
                  color: isActive ? "#678e0b" : "#2E2E2E",
                  "&:hover": { bgcolor: "rgba(103,142,11,0.1)" },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "#678e0b" : "#2E2E2E",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: isActive ? 600 : 500,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </motion.div>
  );
};

export default SidebarAdmin;
