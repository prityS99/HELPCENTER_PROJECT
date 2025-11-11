import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Rating,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import face1 from "../../../assets/Reviews/face 1.jpg";
import face2 from "../../../assets/Reviews/face 2.jpeg";
import face3 from "../../../assets/Reviews/face 3.jpg";
import face4 from "../../../assets/Reviews/face 4.jpg";
import face5 from "../../../assets/Reviews/face 5.jpg";
import face6 from "../../../assets/Reviews/face 6.jpg";
import "../Reviews/Reviews.css";

interface Review {
  name: string;
  review: string;
  image: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: "Anjali Sharma",
    review:
      "The counselors here truly understand. My sessions have helped me find peace and regain confidence in life.",
    image: face1,
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    review:
      "Professional, warm, and deeply empathetic — this center made a real difference in my emotional wellbeing.",
    image: face2,
    rating: 5,
  },
  {
    name: "Priya Verma",
    review:
      "I never thought therapy could be this comforting. The team here genuinely listens and guides with care.",
    image: face3,
    rating: 4,
  },
  {
    name: "Aarav Patel",
    review:
      "Truly transformative sessions. I felt understood, valued, and gently guided toward clarity.",
    image: face4,
    rating: 5,
  },
  {
    name: "Megha Kapoor",
    review:
      "An incredibly safe space — healing began the moment I walked in. Thank you for helping me rebuild myself.",
    image: face5,
    rating: 5,
  },
  {
    name: "Vikram Desai",
    review:
      "Every counselor here radiates empathy. It’s rare to find such genuine care and professionalism together.",
    image: face6,
    rating: 5,
  },
];

const Reviews: React.FC = () => {
  const theme = useTheme();

  return (
    <Box className="moving-bg" sx={{ py: { xs: 6, md: 10 }, position: "relative" }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 700,
            mb: { xs: 5, md: 8 },
            color: "#333",
            letterSpacing: "0.5px",
          }}
        >
          Voices of Healing
        </Typography>

        <AwesomeSlider
          bullets={true}
          organicArrows={true}
          mobileTouch={true}
          style={{
            borderRadius: "24px",
            overflow: "hidden",
          }}
        >
          {reviews.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Paper
                elevation={6}
                sx={{
                  p: { xs: 4, md: 6 },
                  borderRadius: "24px",
                  textAlign: "center",
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(10px)",
                  maxWidth: 600,
                  mx: "auto",
                }}
              >
                <Avatar
                  src={item.image}
                  alt={item.name}
                  sx={{
                    width: 100,
                    height: 100,
                    mx: "auto",
                    mb: 2,
                    border: "3px solid #678e0bff",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: "#222",
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {item.name}
                </Typography>

                <Rating value={item.rating} readOnly sx={{ mb: 2 }} />

                <Typography
                  variant="body2"
                  sx={{
                    color: "#555",
                    fontStyle: "italic",
                    lineHeight: 1.8,
                    px: { xs: 1, md: 3 },
                  }}
                >
                  “{item.review}”
                </Typography>
              </Paper>
            </motion.div>
          ))}
        </AwesomeSlider>
      </Container>
    </Box>
  );
};

export default Reviews;
