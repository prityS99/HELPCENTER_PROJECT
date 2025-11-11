import React from "react";
import {
  Box,
  Typography,
  Stack,
  Link,
  IconButton,
  Divider,
  Container,
  useTheme,
  Grid,
} from "@mui/material";
import GooglePay from "../assets/Footer/GooglePay 1.png";
import Mastercard from "../assets/Footer/Mastercard 1.png";
import PayPal from "../assets/Footer/PayPal 1.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import Logo from "../assets/Logo/logo.webp";

const Footer = () => {
  const theme = useTheme();

  const paymentIcons = [GooglePay, Mastercard, PayPal];
  const socialIcons = [
    { icon: <FacebookIcon fontSize="small" />, label: "Facebook" },
    { icon: <TwitterIcon fontSize="small" />, label: "Twitter" },
    { icon: <InstagramIcon fontSize="small" />, label: "Instagram" },
    { icon: <LinkedInIcon fontSize="small" />, label: "LinkedIn" },
  ];
  const userLinks = [
    "About Us",
    "Contact Us",
    "Ask Help",
    "Terms Of Services",
    "Payments and receipt",
  ];

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        background: "#f1cd3fff",
        // backgroundPosition: "center",
        py: { xs: 4, md: 6 },
        px: { xs: 1, sm: 2 },
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        pt: 6,
        pb: 3,
        mt: 6,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        <Grid container spacing={4}>
          {/* Column 1 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center" },
                textAlign: { xs: "center" },
              }}
            >
              <Box
                component="img"
                src={Logo}
                alt="Logo"
                sx={{ height: "50px", marginLeft: "-120px", mb: 2 }}
              />
              <Box sx={{ mb: 3, ml: 5, }}>
                <Typography variant="body1" sx={{fontFamily: "'Cambria', sans-serif", fontWeight: "600"}}>
                 Hey! Live Life, Love Life, Always Smile
                </Typography>
                <Typography variant="body1" sx={{fontFamily: "'Cambria', sans-serif",fontWeight: "600"}}>
                  Love Yourself and Spread Love to Everyone
                </Typography>
                <Typography variant="body1" sx={{fontFamily: "'Cambria', sans-serif",  fontWeight: "600"}}>
                Remember ! Healing Minds Are Expensive
                </Typography>
              </Box>
              <Stack
                direction="row"
                spacing={1.5}
                justifyContent={{ xs: "center", md: "flex-start" }}
                flexWrap="wrap"
              >
                {socialIcons.map(({ icon, label }) => (
                  <IconButton
                    key={label}
                    aria-label={label}
                    sx={{
                      color: "#131212ff",
                      border: "2px solid rgba(26, 23, 23, 0.3)",
                      borderRadius: "50%",
                      width: 36,
                      height: 36,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: theme.palette.text.secondary,
                      },
                    }}
                  >
                    {icon}
                  </IconButton>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Column 2 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                Quick Links
              </Typography>
              <Stack
                flexWrap="wrap"
                sx={{gap: 1}}
                alignItems ={{ xs: "center", md: "flex-start" }}
              >
                {userLinks.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    underline="none"
                    sx={{
                      color: "#201f1fff",
                      "&:hover": { color: "#5b6f24ff", },
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Column 3 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                Contact
              </Typography>
              <Stack
                spacing={1}
                alignItems={{ xs: "center", md: "flex-start" }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <EmailIcon fontSize="small" />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#201f1fff",
                      "&:hover": { color: "#6c8f2bff" },
                    }}
                  >
                    support@betterlyf.com
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <PhoneIcon fontSize="small" />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#201f1fff",
                      "&:hover": { color: "#56b320ff" },
                    }}
                  >
                    +91 12345 67890
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Grid>

          {/* Column 4 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                textAlign: { xs: "center", md: "left" },
                maxWidth: { xs: "100%", md: "200px" },
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                Our Location
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                NETAJI SUBASH BOSE LANE, Kadamtala, KOLKATA-711104
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                justifyContent={{ xs: "center", md: "flex-start" }}
                sx={{ mt: 1 }}
              >
                {paymentIcons.map((icon, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={icon}
                    alt={`Payment ${index}`}
                    sx={{
                      height: 30,
                      width: "auto",
                      backgroundColor: "rgba(24, 22, 22, 0.1)",
                      borderRadius: "4px",
                      p: 0.5,
                      display: "block",
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: "rgba(68, 24, 24, 0.2)" }} />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="caption" sx={{ color: "#201f1fff" }}>
            Prity Sarkar @2025. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

