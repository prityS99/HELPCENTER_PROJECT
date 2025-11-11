


import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

import anxiety from "../../assets/Therapies/anxiety.jpeg";
import behave from "../../assets/Therapies/behave.jpg";
import couples from "../../assets/Therapies/couples.jpg";
import depression from "../../assets/Therapies/depression.jpg";
import eldercare from "../../assets/Therapies/elder care.jpg";
import family from "../../assets/Therapies/family.jpg";
import kids from "../../assets/Therapies/kids.jpg";
import individual from "../../assets/Therapies/individual.jpg";
import psychiatric from "../../assets/Therapies/psychiatric.jpg";
import teen from "../../assets/Therapies/teen.jpg";
import bg from "../../assets/Therapies/bg.jpeg"
import { useSelector } from "react-redux";
import type { RootState } from "../../Hooks/Redux-Toolkit/store";
import { useNavigate } from "react-router-dom";



const therapies = [
  {
    title: "Child Awareness",
    desc: "Helps children express emotions and behavioral challenges through play and talk sessions.",
    doctor: "Dr. Riya Sharma, Child Psychologist",
    img: kids,
  },
  {
    title: "Teenager Care",
    desc: "Guidance to overcome self-doubt and build clarity in career and life decisions.",
    doctor: "Dr. Anjali Bose, Life Coach",
    img: teen,
  },
  {
    title: "Elder Care Therapy",
    desc: "Supporting seniors with emotional, social, and mental health needs, providing peace and positive aging happily.",
    doctor: "Dr. Suresh Mehta, Geriatric Therapist",
    img: eldercare,
  },
  {
    title: "Individual Consultation",
    desc: "One-on-one sessions to explore emotions, thoughts, and behaviors for deeper self-understanding.",
    doctor: "Dr. Aisha Khan, Clinical Psychologist",
    img: individual,
  },
  {
    title: "Couples Therapy",
    desc: "Helps couples improve communication, trust, and emotional connection through guided counseling.",
    doctor: "Dr. Vikram Roy, Relationship Expert",
    img: couples,
  },
  {
    title: "Family Therapy",
    desc: "Focuses on strengthening family bonds and resolving conflicts with compassionate interventions.",
    doctor: "Dr. Sneha Dey, Family Counselor",
    img: family,
  },
  {
    title: "Behavirol Care",
    desc: "A safe group setting to share experiences, learn coping skills, and build mutual support.",
    doctor: "Dr. Neha Chatterjee, Behavioral Therapist",
    img: behave,
  },
  {
    title: "Anxiety Management",
    desc: "Cognitive and relaxation techniques designed to reduce anxiety and promote calmness.",
    doctor: "Dr. Arjun Sen, CBT Specialist",
    img: anxiety,
  },
  {
    title: "Depression Consultation",
    desc: "A structured path toward emotional healing and finding hope through personalized care.",
    doctor: "Dr. Meena Kapoor, Clinical Therapist",
    img: depression,
  },
  {
    title: "Psychiatric Therapy",
    desc: "Mindfulness-based techniques to manage work and life stress effectively.",
    doctor: "Dr. Ravi Kumar, Mindfulness Coach",
    img: psychiatric,
  },

];

const TherapyPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleBookSession = () => {
    if (!user) {
      navigate("/login")
    } else {
      navigate("/appointment");
    }
  };

  const theme = useTheme();

  return (
    <Box sx={{
      minHeight: "100vh",
      backgroundImage: `linear-gradient(rgba(245, 250, 255, 0.95), rgba(220, 240, 255, 0.9)), url(${bg})`,
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      py: 6,
    }}>
      <Container>
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight={700}
          color="primary"
          mb={8}
          sx={{
            color: "#18506eff",
            fontFamily: "'Poppins', serif",
            fontSize: "45px",
          }}
        >
          Our Therapy Services
        </Typography>
        <Typography
          sx={{
            mb: 4,
            fontSize: { xs: "0.95rem", md: "1.1rem" },
            color: "#19465bff",
            fontWeight: 600,
            maxWidth: "800px",
            mx: "auto",
            textAlign: "center",
            lineHeight: 1.9,
            fontFamily: "'Poppins', serif",
          }}
        >
          Each of one our therapies will give a better life .. Choose your category freely.without any hesitations..
          don't limit yourself for the unimportant thoughts ! Remember mental health is very important.
        </Typography>

        {therapies.map((therapy, index) => (
          <motion.div
            key={index}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Grid
              container
              spacing={5}
              alignItems="center"
              direction={index % 2 === 0 ? "row" : "row-reverse"}
              sx={{
                maxWidth: "lg",
                mb: 10,
                flexWrap: { xs: "wrap", md: "nowrap" },
              }}
            >
              {/* Image Section */}
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={therapy.img}
                  alt={therapy.title}
                  sx={{
                    width: "100%",
                    height: { xs: 250, md: 400 },
                    objectFit: "cover",
                    borderRadius: 4,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                    transition: "transform 0.4s ease",
                    "&:hover": { transform: "scale(1.03)" },
                  }}
                />
              </Grid>

              {/* Text Section */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 4,
                    width: "100%",
                    height: "100%",
                    p: { xs: 3, md: 5 },
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    mb={2}
                    color={theme.palette.primary.main}
                  >
                    {therapy.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    mb={3}
                    sx={{ lineHeight: 1.7 }}
                  >
                    {therapy.desc}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontStyle="italic"
                    color="primary"
                    mb={3}
                  >
                    Preferred Doctor: {therapy.doctor}
                  </Typography>
                  <Stack direction="row" justifyContent="flex-start">
                    <Button
                      variant="contained"
                      onClick={handleBookSession}
                      sx={{
                        borderRadius: 3,
                        px: 4,
                        backgroundColor: "#598e29ff",
                        "&:hover": {
                          bgcolor: "#ac4040ff",
                          py: 2,
                          textTransform: "none",
                        }}
                      }
                      
                    >
                      Book Session
                    </Button>

                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </motion.div>
        ))}
      </Container>
    </Box>
  );
};

export default TherapyPage; 