import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import { Box, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";

import slide1 from "../../../assets/Home/banner 1.jpg";
import slide2 from "../../../assets/Home/banner 2.jpg";
import slide3 from "../../../assets/Home/banner 3.jpg";
import slide4 from "../../../assets/Home/banner 4.jpg";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    fade: true,
    arrows: false,
    responsive: [{ breakpoint: 600, settings: { arrows: false } }],
  };

  const slides = [
    {
      id: 1,
      img: slide1,
      text: "PSYCHOLOGICAL HELP CENTER",
      subText:
        "We are here to support your mental wellness beloved users .. Let's explore yourself, don't hide your pain ..",
      buttonText: "MAKE AN APPOINTMENT",
      buttonLink: "/login",
    },
    {
      id: 2,
      img: slide2,
      text: "Every Emotion Matters. Your Feelings Are Valid.",
      subText: "Talk to someone who listens and understands.",
      buttonText: "GET SUPPORT",
      buttonLink: "/login",
    },
    {
      id: 3,
      img: slide3,
      text: "Don't Be Afraid. Just Have Faith.",
      subText: "Step forward and take the first step to healing.",
      buttonText: "CONTACT US",
      buttonLink: "/login",
    },
    {
      id: 4,
      img: slide4,
      text: "You Are Not Alone. We Are Here.",
      subText: "Together, we can overcome any challenge.",
      buttonText: "ASK HELP",
      buttonLink: "/login",
    },
  ];

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Slider {...settings}>
        {slides.map((slide) => (
          <Box key={slide.id} sx={{ position: "relative" }}>
            {/* Background Image */}
            <Box
              component="img"
              src={slide.img}
              alt={slide.text}
              sx={{
                width: "100%",
                height: { xs: 240, sm: 390, md: 500, lg: 650 },
                objectFit: "cover",
                objectPosition: "center",
              }}
            />

            {/* Text Overlay */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "rgba(0,0,0,0.35)",
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 1.5, sm: 2, md: 4 },
                borderRadius: 3,
                textAlign: "center",
                width: { xs: "90%", sm: "70%", md: "50%" },
                backdropFilter: "blur(6px)",
              }}
            >
              {/* Main Text */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Cambria', sans-serif",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: { xs: "1.2rem", sm: "1.8rem", md: "2.5rem" },
                    lineHeight: 1.2,
                    mb: 1.5,
                  }}
                >
                  {slide.text}
                </Typography>
              </motion.div>

              {/* Subtext */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Poppins', serif",
                    color: "#fff",
                    fontWeight: 400,
                    fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.5rem" },
                    mb: 2,
                  }}
                >
                  {slide.subText}
                </Typography>

                {/* Button */}
                <Stack direction="row" justifyContent="center">
                  <Button
                    variant="contained"
                    href={slide.buttonLink}
                    sx={{
                      fontFamily: "'Poppins', serif",
                      fontWeight: 800,
                      bgcolor: "#678e0bff",
                      px: { xs: 2.5, sm: 4 },
                      py: { xs: 1, sm: 1.5 },
                      textAlign: "center",
                      fontSize: { xs: "0.8rem", sm: "1rem" },
                      borderRadius: "50px",
                      "&:hover": { bgcolor: "#ac4040ff" },
                      
                    }}
                  >
                    {slide.buttonText}
                  </Button>
                </Stack>
              </motion.div>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Banner;



