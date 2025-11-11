import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  Stack,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CouncelorsData from "../../Data/CouncelorsData";
;

const CounselorDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const counselor =   CouncelorsData.find((c) => c.id === Number(id));

  if (!counselor)
    return (
      <Typography variant="h5" textAlign="center" mt={5}>
        Counselor not found.
      </Typography>
    );

  return (
    <Container sx={{ py: 6 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3, textTransform: "none" }}
      >
        Back to All Counselors
      </Button>

      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <CardMedia
          component="img"
          image={counselor.image}
          alt={counselor.name}
          sx={{
            width: { xs: "100%", md: "45%" },
            objectFit: "cover",
          }}
        />

        <Box sx={{ p: 4, flex: 1 }}>
          <Typography
            variant="h4"
            fontFamily="'Cambria', serif"
            fontWeight="bold"
            mb={1}
          >
            {counselor.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={2}>
            {counselor.degree}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" mb={2}>
            Specialization: <b>{counselor.specialization}</b>
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            Available on {counselor.availableDate} at {counselor.availableTime}
          </Typography>

          <Typography
            variant="body1"
            sx={{ lineHeight: 1.8, fontFamily: "'Cambria', serif" }}
          >
            Dr. {counselor.name} is a compassionate and experienced specialist
            with a deep commitment to emotional healing. They provide a safe
            environment for clients to explore, understand, and grow through
            therapy sessions rooted in empathy and proven psychological methods.
          </Typography>

          <Stack direction="row" spacing={2} mt={4}>
            <Button variant="outlined" color="primary">
              Send Message
            </Button>
            <Button variant="contained" 
            sx={{
              backgroundColor:"#1a7f1dff",
            }}>
              Book Session
            </Button>
          </Stack>
        </Box>
      </Card>
    </Container>
  );
};

export default CounselorDetails;
