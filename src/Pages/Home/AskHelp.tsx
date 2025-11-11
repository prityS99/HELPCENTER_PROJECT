import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, Card, CardContent } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// For future Redux integration, these questions will come from the store
// For now, we’ll use a static list:
const initialQuestions: string[] = [
  "Are you feeling emotionally drained or anxious lately?",
  "Do you struggle to find motivation even in things you once loved?",
  "Is overthinking keeping you up at night?",
  "Do you feel alone even when surrounded by people?",
  "Are you finding it hard to express your feelings?",
  "Do you experience sudden bursts of sadness or anger?",
  "Is your work or study life affecting your mental balance?",
  "Do you often feel guilty for taking time for yourself?",
  "Are you seeking a safe space to talk without judgment?",
  "Do you wish to understand yourself a little better?",
];

const AskHelp: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % initialQuestions.length);
    }, 3500); 
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "#eef2f7",
        py: { xs: 6, md: 10 },
        px: { xs: 3, sm: 6, md: 10 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        fontWeight={600}
        sx={{
          
         fontFamily: "'Poppins', sans-serif",
         color: "#11394dff",
          mb: { xs: 3, md: 4 },
          fontSize: { xs: "1.8rem", sm: "2rem", md: "2.4rem" },
        }}
      >
        Ask for Help
      </Typography>

      <Typography
        variant="body1"
        sx={{
          maxWidth: 700,
          mb: 5,
          color: "text.secondary",
          lineHeight: 1.7,
        }}
      >
        Sometimes, the hardest step is the first — admitting that you need help.
        These are some questions that might resonate with you. If they do,
        remember — reaching out is a sign of strength, not weakness.
      </Typography>

      {/* Animated Question Card */}
      <Box sx={{ position: "relative", height: 120, width: "100%", maxWidth: 700 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: "absolute",
              width: "100%",
            }}
          >
            <Card
              elevation={4}
              sx={{
                borderRadius: 3,
                bgcolor: "white",
                px: { xs: 2, sm: 3 },
                py: { xs: 2, sm: 3 },
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    color: "text.primary",
                    fontStyle: "italic",
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    fontWeight: 500,
                  }}
                >
                  “{initialQuestions[currentIndex]}”
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </Box>

      <Stack spacing={2} sx={{ mt: 6, maxWidth: 700, width: "100%" }}>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontSize: "0.95rem" }}
        >
          If any of these questions echo your feelings — you are not alone.
          Our team of caring professionals is here to listen, guide, and support
          you on your journey toward inner peace.
        </Typography>
      </Stack>
    </Box>
  );
};

export default AskHelp;
