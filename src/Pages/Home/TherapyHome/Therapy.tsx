import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import TherapyCard from "../../../Components/Card/TherapyCard";

import kidsTherapy from "../../../assets/Therapies/kids.jpg";
import elderCare from "../../../assets/Therapies/elder care.jpg";
import couples from "../../../assets/Therapies/couples.jpg";
import family from "../../../assets/Therapies/family.jpg";
import individual from "../../../assets/Therapies/individual.jpg";
import teen from "../../../assets/Therapies/teen.jpg";
import psychiatric from "../../../assets/Therapies/psychiatric.jpg";
import anxiety from "../../../assets/Therapies/anxiety.jpeg";

const Therapy = () => {
  const therapies = [
    {
      title: "Kids Therapy",
      desc: "Helping children express emotions, build confidence, and grow stronger emotionally.",
      img: kidsTherapy,
      path: "/therapies",
    },
    {
      title: "Elder Care",
      desc: "Supporting seniors with emotional resilience and joyful aging stress free and happily.",
      img: elderCare,
      path: "/therapies",
    },
    {
      title: "Couples Therapy",
      desc: "Strengthening relationships through understanding and healing communication.",
      img: couples,
      path: "/therapies",
    },
    {
      title: "Individual Therapy",
      desc: "Guiding individuals through challenges towards self-discovery and peace.",
      img: individual,
      path: "/therapies",
    },
    {
      title: "Family Therapy",
      desc: "Healing bonds and nurturing understanding among loved ones.",
      img: family,
      path: "/therapies",
    },
    {
      title: "Teen Therapy",
      desc: "Helping teens navigate emotions and self-esteem in a safe space.",
      img: teen,
      path: "/therapies",
    },
    {
      title: "Psychiatric Therapy",
      desc: "Offering medical and emotional support for mental well-being.",
      img: psychiatric,
      path: "/therapies",
    },
    {
      title: "Anxiety Therapy",
      desc: "Empowering individuals to manage anxiety and regain inner peace.",
      img: anxiety,
      path: "/therapies",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 10 },
        textAlign: "center",
      }}
    >
      {/* Section Title */}
      <Typography
        variant="h3"
        sx={{
          fontFamily: "'Poppins', serif",
          fontWeight: "bold",
          color: "#0e4c50ff",
          mb: 2,
          fontSize: { xs: "2rem", md: "2.5rem" },
        }}
      >
        Categories of Therapy
      </Typography>

      <Typography
        variant="body1"
        sx={{
          maxWidth: "800px",
          mx: "auto",
          color:"black",
          fontFamily: "'Poppins', serif",
          fontWeight: "800px",
          fontSize: "25px",
          mb: { xs: 4, md: 6 },
        }}
      >
        We offer diverse therapeutic approaches to support individuals, couples, and families through every stage of life.
      </Typography>

      {/* Cards Section */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "stretch",
          gap: 4,
        }}
      >
        {therapies.map((therapy, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            style={{
              flex: "1 1 260px",
              maxWidth: "300px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TherapyCard
              title={therapy.title}
              desc={therapy.desc}
              img={therapy.img}
              path={therapy.path}
              index={index}
            />
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default Therapy;
