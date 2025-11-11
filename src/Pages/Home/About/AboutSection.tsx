import React from "react";
import { Box, Typography, Button, Stack, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import aboutImg from "../../../assets/Aboutus/aboutus.svg";

const AboutSection: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        color: isDark ? '#e0f2f1' : '#263c56ff',
        gap: { xs: 4, md: 6 },
        px: { xs: 2, sm: 4, md: 10 },
        py: { xs: 6, md: 10 },
        bgcolor: "#f6f8fb",
        overflow: "hidden",
        '&::after': {
              // content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              bgcolor: theme.palette.primary.main,
              borderRadius: '3px',}
      }}
    >
      {/* Left Side Image */}
      <Box
        component="img"
        src={aboutImg}
        alt="About Psychological Help Centre"
        sx={{
          width: { xs: "90%", md: "45%" },
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          objectFit: "cover",
          transition: "transform 0.6s ease, box-shadow 0.4s ease",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          },
        }}
      />

      {/* Right Side Content */}
      <Stack
        spacing={3}
        sx={{
          width: { xs: "120%", md: "35%" },
          textAlign: { xs: "center", md: "left" },
         
        }}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          color= "#263c56ff"
          sx={{
             fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: "1.8rem", sm: "2rem", md: "2.3rem" },
          }}
        >
          About Our Centre
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            lineHeight: 1.8,
            fontFamily : "'Poppins', serif",
            fontWeight: "600",
            fontSize: { xs: "0.92rem", sm: "1.1rem" },
            transition: "color 0.3s ease",
            "&:hover": {
              color: "text.primary",
            },
          }}
        >
          At our Betterlyf Psychological Help Centre, we believe that true healing begins
          with understanding and compassion. Our professionals create a safe,
          nurturing space where individuals can share, heal, and grow. Through
          therapy, counseling, and emotional guidance, we help people rediscover hope
          and balance in life’s most challenging moments. We always cherish your 
          ability to live life by handelling unexpected situations, but if sometimes
          when you feel you can't, just feel free to come  
        </Typography>

        {/* <Button
          variant="contained"
          size="large"
          sx={{
            alignSelf: { xs: "center", md: "flex-start" },
            borderRadius: "30px",
            px: 4,
            py: 1.2,
            textTransform: "none",
            fontWeight: 600,
            backgroundColor: '#678e0bff',
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "#f57474ff",
              transform: "translateY(-3px)",
              boxShadow: "0 6px 20px rgba(136, 175, 44, 0.15)",
            },
          }}
          onClick={() => navigate("/about")}
        >
          VIEW MORE
        </Button> */}
      </Stack>
    </Box>
  );
};

export default AboutSection;
