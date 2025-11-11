import Footer from "../../Layout/Footer";
import Navbar from "../../Layout/Navbar";
import CounselorsList from "../Home/Councelors/CouncelorsList";
import Banner from "./Banner/Banner";
import { Box } from "@mui/material";
import Therapy from "./TherapyHome/Therapy";
import AskHelp from "./AskHelp";
import AboutSection from "./About/AboutSection";
import ReviewsSection from "./Reviews/Reviews";

const Home = () => {
  return (
    <Box sx={{ backgroundColor: "#FAF9F6", minHeight: "100vh" }}>
      {/* <Navbar /> */}
      <Banner />
      <AboutSection />
      <CounselorsList />
      <Therapy />
      <AskHelp />
      <ReviewsSection/>
      {/* <Footer /> */}


    </Box>
  );
};

export default Home;
