import React from 'react';
import { Box, Container, Typography, useTheme, Grow, Button, Grid } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import CounselorCard from '../../../Components/Card/CouncelorsCard';
import { useNavigate } from 'react-router-dom';


import doc1 from "../../../assets/Councelors/doc 1.png";
import doc2 from "../../../assets/Councelors/doc 2.jpg";
import doc3 from "../../../assets/Councelors/doc 3.jpg";
import doc4 from "../../../assets/Councelors/doc 4.png";
import doc5 from "../../../assets/Councelors/doc 5.png";
import doc6 from "../../../assets/Councelors/doc 6.png";

const counselors = [
  { id: 1, name: "Dr. Ananya Sen", specialization: "Clinical Psychologist", image: doc1 },
  { id: 2, name: "Ms. Arpita Roy", specialization: "Counseling Psychologist", image: doc2 },
  { id: 3, name: "Mr. Arjun Das", specialization: "Child & Adolescent Therapist", image: doc3 },
  { id: 4, name: "Dr. Priya Mehra", specialization: "Marriage & Family Therapist", image: doc4 },
  { id: 5, name: "Mr. Rohan Mitra", specialization: "Career Counselor", image: doc5 },
  { id: 6, name: "Dr. Sneha Sharma", specialization: "Cognitive Behavioral Therapist", image: doc6 },

];

const CounselorsList: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: 8,
        bgcolor: isDark ? '#1a2624' : '#f9f9f9',
        borderTop: `1px solid ${isDark ? '#2e3d3b' : '#e0e0e0'}`,
        overflow: 'visible', 
      }}
    >
      <Container maxWidth="lg">
        {/* Title */}
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          mb={6}
          sx={{
            fontFamily: "'Cambria', serif",
            fontWeight: 700,
            color: isDark ? '#e0f2f1' : '#263c56ff',
            position: 'relative',
            pb: 1,
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              bgcolor: theme.palette.primary.main,
              borderRadius: '3px',
            },
          }}
        >
          Meet Our Expert Counselors
        </Typography>

        {/* Counselors Grid */}
        <Grid container spacing={4} justifyContent="center">
          {counselors.map((counselor, index) => {
            const { ref, inView } = useInView({
              threshold: 0.2,
              triggerOnce: true,
            });

            return (
              <Grid item key={counselor.id} xs={12} sm={6} md={4} lg={3} ref={ref}>
                <Grow
                  in={inView}
                  timeout={800 + index * 100}
                  style={{ transformOrigin: '0 0 0' }}
                >
                  <div>
                    <CounselorCard
                      name={counselor.name}
                      specialization={counselor.specialization}
                      imageUrl={counselor.image}
                    />
                  </div>
                </Grow>
              </Grid>
            );
          })}
        </Grid>

        {/* View More Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            onClick={()=> navigate('/councelorslist')}
          
            sx={{
              bgcolor: '#5c9924ff',
              color: 'white',
              px: 4,
              py: 1.5,
              fontWeight: 600,
              borderRadius: '8px',
              boxShadow: theme.shadows[3],
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#ac4040ff',
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[6],
              },
            }}
          >
            VIEW MORE
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CounselorsList;