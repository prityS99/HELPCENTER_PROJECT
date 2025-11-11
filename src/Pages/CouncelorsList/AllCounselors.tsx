
import React, { useRef, useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  MenuItem,
  Grow,
  useTheme,
  Grid,
} from "@mui/material";
import { useInView } from "react-intersection-observer";
import CounselorPageCard from "../../Components/Card/CouncelorsPageCard";

import doc1 from "../../assets/Councelors/doc 1.png";
import doc2 from "../../assets/Councelors/doc 2.jpg";
import doc3 from "../../assets/Councelors/doc 3.jpg";
import doc4 from "../../assets/Councelors/doc 4.png";
import doc5 from "../../assets/Councelors/doc 5.png";
import doc6 from "../../assets/Councelors/doc 6.png";
import doc7 from "../../assets/Councelors/doc 7.jpg";
import doc8 from "../../assets/Councelors/doc 8.jpg";
import doc9 from "../../assets/Councelors/doc 9.png";
import doc10 from "../../assets/Councelors/doc 10.png";
import doc11 from "../../assets/Councelors/doc 11.jpg";
import doc12 from "../../assets/Councelors/doc 12.png";
// import doc13 from "../../assets/Councelors/doc 13.png";
// import doc14 from "../../assets/Councelors/doc 14.png";
// import doc15 from "../../assets/Councelors/doc 15.png";
import bg from "../../assets/Councelors/bg.jpg";

const counselors = [
  {
    id: 1,
    name: "Dr. Ananya Sen",
    degree: "PhD, Clinical Psychology",
    specialization: "Clinical Psychologist",
    image: doc1,
    availableDate: "2025-11-05",
    availableTime: "11:00 AM",
    category: "Clinical",
  },
  {
    id: 2,
    name: "Ms. Arpita Roy",
    degree: "M.A. Counseling",
    specialization: "Counseling Psychologist",
    image: doc2,
    availableDate: "2025-11-07",
    availableTime: "4:30 PM",
    category: "Counseling",
  },
  {
    id: 3,
    name: "Mr. Arjun Das",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    image: doc3,
    availableDate: "2025-11-05",
    availableTime: "10:00 AM",
    category: "Child",
  },
    {
    id: 4,
    name: "Mr. Arjun Das",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    image: doc4,
    availableDate: "2025-11-05",
    availableTime: "10:00 AM",
    category: "Child",
  },
    {
    id: 5,
    name: "Mr. Arjun Das",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    image: doc5,
    availableDate: "2025-11-05",
    availableTime: "10:00 AM",
    category: "Child",
  },
    {
    id: 6,
    name: "Mr. Arjun Das",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    image: doc6,
    availableDate: "2025-11-05",
    availableTime: "10:00 AM",
    category: "Child",
  },
    {
    id: 7,
    name: "Mr. Arjun Das",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    image: doc7,
    availableDate: "2025-11-05",
    availableTime: "10:00 AM",
    category: "Child",
  },
    {
    id: 8,
    name: "Mr. Arjun Das",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    image: doc8,
    availableDate: "2025-11-05",
    availableTime: "10:00 AM",
    category: "Child",
  },
    {
    id: 9,
    name: "Mr. Arjun Das",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    image: doc9,
    availableDate: "2025-11-05",
    availableTime: "10:00 AM",
    category: "Child",
  },
    {
    id: 10,
    name: "Mr. Arjun Das",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    image: doc10,
    availableDate: "2025-11-05",
    availableTime: "10:00 AM",
    category: "Child",
  },
    {
    id: 11,
    name: "Mr. Arjun Das",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    image: doc11,
    availableDate: "2025-11-05",
    availableTime: "10:00 AM",
    category: "Child",
  },
    {
    id: 12,
    name: "Mr. Arjun Das",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    image: doc12,
    availableDate: "2025-11-05",
    availableTime: "10:00 AM",
    category: "Child",
  },

];

const therapyCategories = [
  "All",
  "Clinical",
  "Counseling",
  "Child",
  "Family",
  "Marriage",
  "Anxiety",
  "Career",
];

const AllCouncelors: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("All");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const focusSearch = () => searchRef.current?.focus();

  const filteredCounselors = useMemo(() => {
    return counselors.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchText.toLowerCase()) ||
        c.specialization.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = category === "All" ? true : c.category === category;
      const matchesDate = date ? c.availableDate === date : true;
      const matchesTime = time ? c.availableTime === time : true;
      return matchesSearch && matchesCategory && matchesDate && matchesTime;
    });
  }, [searchText, category, date, time]);

  const resetFilters = () => {
    setSearchText("");
    setCategory("All");
    setDate("");
    setTime("");
    focusSearch();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(245, 250, 255, 0.95), rgba(220, 240, 255, 0.9)), url(${bg})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        py: 6,
      }}
    >
      {/* ✨ Title Section */}
      <Container maxWidth="md" sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h3"
          sx={{
            color: "#0b5487ff",
            fontWeight: 800,
            fontFamily: "'Poppins', serif",
            fontSize: "45px",
          }}
        >
          Meet Our Expert Counselors
        </Typography>

        <Typography
          sx={{
            mt: 2,
            fontSize: { xs: "0.95rem", md: "1.1rem" },
            color: "#19465bff",
            fontWeight: 600,
            maxWidth: "750px",
            mx: "auto",
            lineHeight: 1.7,
            fontFamily: "'Poppins', serif",
          }}
        >
          Each of our professionals brings deep empathy and seasoned understanding.
          Discover your counselor — someone ready to listen, guide, and support you.
        </Typography>
      </Container>

      {/* ✨ Filter Section */}
      <Container maxWidth="lg">
        <Box
          sx={{
            p: 3,
            mb: 5,
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.8)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
            backdropFilter: "blur(6px)",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Search by doctor or specialization"
                inputRef={searchRef}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <TextField
                select
                fullWidth
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {therapyCategories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <TextField
                fullWidth
                type="date"
                label="Available Date"
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <TextField
                fullWidth
                label="Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={resetFilters}
                sx={{
                  height: "100%",
                  backgroundColor: "#5da225ff",
                  fontWeight: 600,
                  color: "#fff",
                  "&:hover": { backgroundColor: "#ac4040ff" },
                }}
              >
                Reset Filters
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* ✨ Counselors Grid */}
        <Grid container spacing={4} justifyContent="center">
          {filteredCounselors.map((counselor, index) => {
            const { ref, inView } = useInView({
              threshold: 0.2,
              triggerOnce: true,
            });

            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={counselor.id}
                ref={ref}
              >
                <Grow in={inView} timeout={800 + index * 100}>
                  <div>
                    <CounselorPageCard
                    id={counselor.id}
                      name={counselor.name}
                      degree={counselor.degree}
                      specialization={counselor.specialization}
                      imageUrl={counselor.image}
                      date={counselor.availableDate}
                      time={counselor.availableTime}
                      showButtons
                    />
                  </div>
                </Grow>
              </Grid>
            );
          })}
        </Grid>

        {filteredCounselors.length === 0 && (
          <Typography
            textAlign="center"
            mt={5}
            color="gray"
            fontStyle="italic"
          >
            No doctors found matching your filters.
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default AllCouncelors;
