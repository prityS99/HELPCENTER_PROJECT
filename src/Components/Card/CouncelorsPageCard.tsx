import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CounselorPageCardProps {
  id?: number;
  name: string;
  degree: string;
  specialization: string;
  description: string;
  imageUrl: string;
  date: string;
  time: string;
  showButtons?: boolean;
  onCardClick?: (e: React.MouseEvent) => void;
}

const CounselorPageCard: React.FC<CounselorPageCardProps> = ({
  id,
  name,
  degree,
  specialization,
  description,
  imageUrl,
  date,
  time,
  showButtons = false,
  onCardClick,
}) => {
  const navigate = useNavigate();

  const handleBookSession = () => {
    navigate("/appointment", {
      state: {
        counselorName: name,
        counselorDate: date,
        counselorTime: time,
      },
    });
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        },
        cursor: onCardClick ? "pointer" : "default",
      }}
      onClick={onCardClick}
      role={onCardClick ? "button" : undefined}
      tabIndex={onCardClick ? 0 : undefined}
    >
      <CardMedia
        component="img"
        height={250}
        image={imageUrl}
        alt={name}
        sx={{
          objectFit: "cover",
          width: "100%",
          height: { xs: 220, sm: 250 },
        }}
      />

      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontFamily: "'Cambria', serif" }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 0.5,
            fontFamily: "'Cambria', serif",
          }}
        >
          {degree}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.primary",
            mb: 1,
            fontFamily: "'Poppins', serif",
          }}
        >
          {specialization}
        </Typography>
<Typography
  variant="body2"
  sx={{
    mt: 1,
    color: "text.secondary",
    fontWeight: "bold",      
    fontFamily: "'Cambria', serif",
    whiteSpace: "pre-line"
  }}
>
  {description}
</Typography>


        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontStyle: "italic",
            fontFamily: "'Cambria', serif",
          }}
        >
          Available: {date} at {time}
        </Typography>

        {showButtons && (
          <Stack
            direction="row"
            spacing={1.5}
            justifyContent="center"
            sx={{ mt: 2 }}
          >
            <Button
              variant="outlined"
              color="primary"
              sx={{
                textTransform: "none",
                borderRadius: "20px",
                fontFamily: "'Poppins', serif",
              }}
              onClick={onCardClick}
              disabled={id === undefined}
            >
              View Profile
            </Button>

            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: "20px",
                fontFamily: "'Poppins', serif",
              }}
              onClick={handleBookSession}
            >
              Book Session
            </Button>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default CounselorPageCard;
