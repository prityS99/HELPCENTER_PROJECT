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
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import { useInView } from "react-intersection-observer";
import CounselorPageCard from "../../Components/Card/CouncelorsPageCard";
import CloseIcon from "@mui/icons-material/Close";

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

import bg from "../../assets/Councelors/bg.jpg";

const counselors = [
  {
    id: 1,
    name: "Dr. Ananya Sen",
    degree: "PhD, Clinical Psychology",
    specialization: "Clinical Psychologist",
    experience: "10+ years of experience in adult therapy and trauma recovery.",
    description:
      "Dr. Sen specializes in cognitive  behavioral therapy and emotional resilience building. She’s known for her empathetic yet practical approach to mental wellness.",
    image: doc1,
    availableDate: "20-11-2025",
    availableTime: "11:00 to 4:00pm",
    category: "Clinical",
  },
  {
    id: 2,
    name: "Ms. Arpita Roy",
    degree: "M.A. Counseling",
    specialization: "Counseling Psychologist",
    experience: "8 years of experience in stress and anxiety management.",
    description:
      "Ms. Roy focuses on helping clients find clarity in life’s complexities through mindful communication and self-compassion techniques.",
    image: doc2,
      availableDate: "19-11-2025",
    availableTime: "11:00 to 4:00pm",
    category: "Counseling",
  },
  {
    id: 3,
    name: "Mr. Arjun Das",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    experience: "7 years working with school-aged children and parents.",
    description:
      "Mr. Das creates engaging, trust-based therapy sessions for children dealing with anxiety, social challenges, and behavioral concerns.",
    image: doc3,
       availableDate: "28-11-2025",
    availableTime: "12:00 to 4:00pm",
    category: "Child",
  },
   
    {
    id: 4,
    name: "Dr. Neha Kapoor",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    experience: "7 years working with school-aged children and parents.",
    description:
     "Dr. Neha helps families navigate communication barriers and emotional challenges with warmth and clarity.",
    image: doc4,
      availableDate: "25-11-2025",
    availableTime: "10:00 to 1:00pm",
    category: "Child",
  },

    {
    id: 5,
    name: "Dr. Suresh Mehta",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    experience: "7 years working with school-aged children and parents.",
    description:
     "Suresh uses mindfulness and evidence-based methods to help clients overcome anxiety, stress, and burnout.",
    image: doc5,
      availableDate: "20-11-2025",
    availableTime: "11:00 to 4:00pm",
    category: "Child",
  },
      {
    id: 6,
    name: "Dr. Arpita Sharma",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    experience: "7 years working with school-aged children and parents.",
    description:
     "Dr. Neha helps families navigate communication barriers and emotional challenges with warmth and clarity.",
    image: doc6,
      availableDate: "20-11-2025",
    availableTime: "11:00 to 4:00pm",
    category: "Child",
  },
      {
    id: 7,
    name: "Dr. Aisha Kapoor",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    experience: "7 years working with school-aged children and parents.",
    description:
     "Dr. Neha helps families navigate communication barriers and emotional challenges with warmth and clarity.",
    image: doc7,
        availableDate: "20-11-2025",
    availableTime: "11:00 to 4:00pm",
    category: "Child",
  },
      {
    id: 8,
    name: "Dr. Kunal Kapoor",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    experience: "7 years working with school-aged children and parents.",
    description:
     "Dr. Kunal helps families navigate communication barriers and emotional challenges with warmth and clarity.",
    image: doc8,
     availableDate: "20-11-2025",
    availableTime: "11:00 to 4:00pm",
    category: "Child",
  },
      {
    id: 9,
    name: "Dr. Surbhi Jain",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    experience: "7 years working with school-aged children and parents.",
    description:
     "Dr. Arvind helps families navigate communication barriers and emotional challenges with warmth and clarity.",
    image: doc9,
      availableDate: "20-11-2025",
    availableTime: "11:00 to 4:00pm",
    category: "Child",
  },
      {
    id: 10,
    name: "Dr. Arvind Jain",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    experience: "7 years working with school-aged children and parents.",
    description:
     "Dr. Arvind helps families navigate communication barriers and emotional challenges with warmth and clarity.",
    image: doc10,
    availableDate: "20-11-2025",
    availableTime: "11:00 to 4:00pm",
    category: "Child",
  },
      {
    id: 11,
    name: "Dr. Meena Kapoor",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    experience: "7 years working with school-aged children and parents.",
    description:
     "Dr. Neha helps families navigate communication barriers and emotional challenges with warmth and clarity.",
    image: doc11,
     availableDate: "23-11-2025",
    availableTime: "11:00 to 4:00pm",
    category: "Child",
  },
        {
    id: 12,
    name: "Dr. Prity Saha",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    experience: "7 years working with school-aged children and parents.",
    description:
     "Dr. Prity helps families navigate communication barriers and emotional challenges with warmth and clarity.",
    image: doc12,
        availableDate: "15-11-2025",
    availableTime: "11:00 to 4:00pm",
    category: "Child",
  },
    

]

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

const CounselorPage: React.FC = () => {
  const theme = useTheme();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("All");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState<any>(null);

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

  const handleViewProfile = (counselor: any) => {
    setSelectedCounselor(counselor);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCounselor(null);
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
          <Grid container spacing={5}>
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
              <Grid item xs={12} sm={6} md={4} lg={3} key={counselor.id} ref={ref}>
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
                      onCardClick={() => handleViewProfile(counselor)}
                    />
                  </div>
                </Grow>
              </Grid>
            );
          })}
        </Grid>

        {filteredCounselors.length === 0 && (
          <Typography textAlign="center" mt={5} color="gray" fontStyle="italic">
            No doctors found matching your filters.
          </Typography>
        )}
      </Container>

      {/* ✨ Counselor Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
            backgroundColor: "rgba(255,255,255,0.95)",
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontFamily: "'Cambria', serif", fontWeight: "bold" }}>
            Counselor Profile
          </Typography>
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />

        <DialogContent>
          {selectedCounselor && (
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={3}
              sx={{ alignItems: "center", mt: 2 }}
            >
              <Box
                component="img"
                src={selectedCounselor.image}
                alt={selectedCounselor.name}
                sx={{
                  width: { xs: "100%", md: "45%" },
                  borderRadius: 3,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                }}
              />

              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", mb: 1, fontFamily: "'Cambria', serif" }}
                >
                  {selectedCounselor.name}
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1 }}>
                  {selectedCounselor.degree}
                </Typography>
                <Typography sx={{ color: "#0b5487ff", mb: 2 }}>
                  {selectedCounselor.specialization}
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  <strong>Experience:</strong> {selectedCounselor.experience}
                </Typography>
                <Typography sx={{ mb: 2, fontStyle: "italic" }}>
                  {selectedCounselor.description}
                </Typography>
                <Typography sx={{ fontWeight: "bold", mt: 1 }}>
                  Available: {selectedCounselor.availableDate} at{" "}
                  {selectedCounselor.availableTime}
                </Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CounselorPage;
