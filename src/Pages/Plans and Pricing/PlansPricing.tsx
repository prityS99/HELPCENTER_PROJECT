// src/Pages/PlansPricing/PlansPricing.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import bg from "../../assets/Plans/bg.jpg";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const plans = [
  {
    name: "Basic Care",
    price: "$20/month",
    description: "Ideal for individuals beginning their therapy journey.",
    features: [
      "30-minute weekly session",
      "Licensed psychologist",
      "Email support",
      "Digital progress tracker",
    ],
  },
  {
    name: "Standard Wellness",
    price: "$35/month",
    description: "Perfect for ongoing therapy and deeper support.",
    features: [
      "50-minute weekly session",
      "Priority booking",
      "Personalized exercises",
      "Access to mental wellness webinars",
    ],
  },
  {
    name: "Premium Healing",
    price: "$55/month",
    description:
      "Comprehensive, 1-on-1 support with dedicated therapist follow-up.",
    features: [
      "60-minute weekly session",
      "Senior psychologist support",
      "24/7 chat + call assistance",
      "Family or couple add-on",
      "Dedicated care manager",
    ],
  },
];

const blogs = [
  {
    title: "The Art of Listening to Yourself",
    excerpt:
      "Discover why slowing down and reflecting can transform your emotional clarity.",
    author: "Dr. Anjali Nair",
    date: "Oct 2025",
  },
  {
    title: "5 Daily Habits for Mental Peace",
    excerpt:
      "Small, mindful steps that help you nurture calm and emotional balance.",
    author: "Ravi Sharma",
    date: "Sep 2025",
  },
  {
    title: "Healing Through Connection",
    excerpt:
      "Understand the importance of empathy and communication in recovery.",
    author: "Dr. Meera Kapoor",
    date: "Aug 2025",
  },
];

const PlansPricing: React.FC = () => {
  return (
    <>


      {/* 🌸 Background Section */}
      <Box
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          py: { xs: 6, md: 10 },
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom right, rgba(255,255,255,0.85), rgba(140, 179, 213, 0.8))",
            zIndex: 0,
          },
        }}
      >
        <Container sx={{ position: "relative" }}>
          <Typography
            variant="h3"
            align="center"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, color: "#125c6fff", fontSize: "45px" }}
            gutterBottom
          >
            Plans & Pricing
          </Typography>
          <Typography variant="h6" align="center" gutterBottom
            sx={{
              color: "#1d6192ff",
              fontFamily: "'Poppins', serif",
              fontWeight: "600",
              fontSize: "25px",
            }}>
            Transparent, flexible, and affordable subscriptions are available .. Please choose for your peace of mind.
          </Typography>

          {/* 🌿 Animated Cards */}
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="stretch"
            sx={{ mt: 6 }}
          >
            {plans.map((plan, index) => (
              <Grid item xs={12} sm={6} md={4} key={plan.name}>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card
                    elevation={8}
                    sx={{
                      height: "100%",
                      borderRadius: "20px",
                      backdropFilter: "blur(10px)",
                      background: "rgba(255,255,255,0.95)",
                      color: "#333",
                      textAlign: "center",
                      transition: "all 0.4s ease",
                      ":hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" fontWeight={600} gutterBottom>
                        {plan.name}
                      </Typography>
                      <Typography
                        variant="h3"
                        fontWeight={700}
                        gutterBottom
                      >
                        {plan.price}
                      </Typography>
                      <Typography variant="body1" mb={2}>
                        {plan.description}
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          textAlign: "left",
                        }}
                      >
                        {plan.features.map((feature, idx) => (
                          <li key={idx}>✅ {feature}</li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        
                        fullWidth
                        sx={{
                          borderRadius: "10px",
                          fontWeight: 600,
                          backgroundColor: "#4ba011ff",
                          ":hover": {
                            bgcolor: "#ac4040ff",
                          },
                          py: 1.2,
                        }}
                      >
                        Get Started
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* 📊 Comparison Table */}
          <Box
            sx={{
              mt: 10,
              background: "rgba(255,255,255,0.95)",
              color: "#000",
              borderRadius: 4,
              p: { xs: 3, md: 5 },
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              fontWeight={700}
              gutterBottom
            >
              Compare Features
            </Typography>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Weekly Session Length</TableCell>
                  <TableCell align="center">30 min</TableCell>
                  <TableCell align="center">50 min</TableCell>
                  <TableCell align="center">60 min</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Licensed Therapist</TableCell>
                  <TableCell align="center">✅</TableCell>
                  <TableCell align="center">✅</TableCell>
                  <TableCell align="center">✅</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>24/7 Chat Support</TableCell>
                  <TableCell align="center">—</TableCell>
                  <TableCell align="center">—</TableCell>
                  <TableCell align="center">✅</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Webinar Access</TableCell>
                  <TableCell align="center">—</TableCell>
                  <TableCell align="center">✅</TableCell>
                  <TableCell align="center">✅</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Dedicated Care Manager</TableCell>
                  <TableCell align="center">—</TableCell>
                  <TableCell align="center">—</TableCell>
                  <TableCell align="center">✅</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>

          {/* 📰 Blog Section */}
          <Box sx={{ mt: 10 }}>
            <Typography
              variant="h4"
              textAlign="center"
              gutterBottom

              sx={{
                color: "#1d6192ff",
             fontFamily: "'Poppins', serif",
            fontSize: "35px",
            fontWeight:"650",
              }}
            >
              Latest Insights
            </Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              sx={{
                color:"black"
              }}
              mb={4}
            >
              Read helpful guidance from our mental wellness experts.
            </Typography>

            <Box
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                maxWidth: 900,
                mx: "auto",
              }}
            >
              <AutoplaySlider play interval={4000} cancelOnInteraction={false}
            >
                {blogs.map((blog, idx) => (
                  <div key={idx}>
                    <Box
                      sx={{
                        background: "rgba(226, 156, 156, 0.95)",
                        color: "#d5aaaaff",
                        borderRadius: 4,
                        p: 4,
                        mx: 2,
                      }}
                    >
                      <Typography variant="h6" gutterBottom
                      sx={{fontSize: "25px", fontWeight: "550px"}}>
                        {blog.title}
                      </Typography>
                      <Typography variant="body2" mb={2}>
                        {blog.excerpt}
                      </Typography>
                      <Typography variant="caption" color="primary">
                        {blog.author} • {blog.date}
                      </Typography>
                    </Box>
                  </div>
                ))}
              </AutoplaySlider>
            </Box>
          </Box>
        </Container>
      </Box>


    </>
  );
};

export default PlansPricing;
