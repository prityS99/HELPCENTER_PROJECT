import React, { useState } from "react";
import { Box, useMediaQuery, useTheme, Drawer } from "@mui/material";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";
import NavbarAdmin from "./NavbarAdmin";

const WrapperAdmin = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(!isMobile);

  const toggleSidebar = () => setOpen((prev) => !prev);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8f9fa" }}>
      {/* Sidebar for desktop */}
      {!isMobile && <SidebarAdmin open={open} />}

      {/* Drawer for mobile */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={open}
          onClose={toggleSidebar}
          PaperProps={{
            sx: {
              width: 240,
              bgcolor: "white",
              borderRight: "1px solid rgba(0,0,0,0.1)",
            },
          }}
        >
          <SidebarAdmin open />
        </Drawer>
      )}

      {/* Main content */}
      <Box sx={{ flexGrow: 1 }}>
        <NavbarAdmin toggleSidebar={toggleSidebar} />
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            transition: "margin 0.3s ease",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default WrapperAdmin;
