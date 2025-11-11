import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface TherapyCardProps {
  title: string;
  desc: string;
  img: string;
  path: string;
  index: number;
}

const TherapyCard: React.FC<TherapyCardProps> = ({
  title,
  desc,
  img,
  path,
  index,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{
        rotateY: 8,
        rotateX: -5,
        scale: 1.03,
        boxShadow: "0px 12px 25px rgba(0,0,0,0.15)",
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 12,
      }}
      style={{
        perspective: "1000px",
      }}
    >
      <Card
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0px 6px 15px rgba(0,0,0,0.08)",
          backgroundColor: "#ffffff",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
          },
        }}
      >
        <Box sx={{ overflow: "hidden", height: { xs: 200, md: 240 } }}>
          <CardMedia
            component="img"
            image={img}
            alt={title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scale(1)",
              transition: "transform 0.6s ease",
              "&:hover": { transform: "scale(1.08)" },
            }}
          />
        </Box>

        <CardContent
          sx={{
            textAlign: "center",
            p: { xs: 2, sm: 3 },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#114e7aff",
              fontWeight: "bold",
              mb: 1,
              fontFamily: "Playfair Display, serif",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              fontFamily: "Poppins, sans-serif",
              minHeight: "48px",
            }}
          >
            {desc}
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              borderRadius: "20px",
              px: 3,
              backgroundColor: "#678e0bff",
              "&:hover": { backgroundColor: "#ac4040ff" },
            }}
            onClick={() => navigate(path)}
          >
            Learn More
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TherapyCard;
