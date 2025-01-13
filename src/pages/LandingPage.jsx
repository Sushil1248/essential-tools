import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ToolsSection from "./components/ToolsSection";
import Footer from "./components/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ToolsSection />
      <Footer />
    </>
  );
};

export default LandingPage;
