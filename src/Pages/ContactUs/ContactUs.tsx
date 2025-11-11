import { Box, Container, TextField, Typography, Button, Stack } from "@mui/material";
import { useState } from "react";
import { motion, type Variants } from "framer-motion"; // <-- Import Variants here
import bg from "../../assets/Contactus/bg.jpg"

// 1. Parent Variant: Defines the staggered sequence
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, 
    },
  },
};

// 2. Child Variant: Defines the animation for each input field
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for reaching out. Our care team will connect with you soon!");
    setFormData({ name: "", email: "", message: "" });
  };

  // The fadeInUp for the heading is still good as a separate animation
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
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
      }}>


 <Container maxWidth="md" >
      {/* Title (Keeps simple fadeInUp animation) */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          sx={{ mb: 2, color: "#1d6192ff",
             fontFamily: "'Poppins', serif",
            fontSize: "45px",
           }}
        >
          Contact Our Care Team
        </Typography>
        <Typography
          variant="body1"
          align="center"
         
          sx={{ mb: 6,
            color: "#1d6192ff",
             fontFamily: "'Poppins', serif",
             fontWeight: "600",
            fontSize: "25px",
           }}
        >
          You’re not alone. Write to us — we’re here to listen and help you heal.
        </Typography>
      </motion.div>

      {/* Form Card (Now the PARENT for the staggered animation) */}
      <motion.div
        variants={containerVariants} // <-- Parent variant applied here
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} // Less strict requirement for visibility
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 5,
            borderRadius: 3,
            bgcolor: "white",
            boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* We use a motion.div for the Stack to correctly apply child staggering */}
          <Stack spacing={3} component={motion.div}> 
            
            {/* Child 1: Name Field */}
            <motion.div variants={itemVariants}> 
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </motion.div>

            {/* Child 2: Email Field */}
            <motion.div variants={itemVariants}>
              <TextField
                fullWidth
                label="Your Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </motion.div>

            {/* Child 3: Message Field */}
            <motion.div variants={itemVariants}>
              <TextField
                fullWidth
                label="Your Message"
                name="message"
                multiline
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </motion.div>

            {/* Child 4: Submit Button */}
            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  bgcolor: "#64a321ff",
                  "&:hover": { bgcolor: "#ac4040ff" },
                }}
              >
                Send Message
              </Button>
            </motion.div>
          </Stack>
        </Box>
      </motion.div>

      {/* Map Section (Keeps simple fadeInUp animation) */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Box
          sx={{
            mt: 8,
            height: 400,
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <iframe
            title="Psychological Help Centre Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.9796446886437!2d72.87765577446897!3d19.07157935213917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7b4c89d2a05%3A0x1e47e3e2d46e420!2sPsychological%20Help%20Centre!5e0!3m2!1sen!2sin!4v1694942740123!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
      </motion.div>
    </Container>
    </Box>
    
  );
};

export default ContactUs;