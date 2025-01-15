import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ToolsSection from "./components/ToolsSection";
import HighlightProject from "./components/HighlightProject";

import Footer from "./components/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HighlightProject />
      <ToolsSection />
      <Footer />
    </>
  );
};

export default LandingPage;
