import React from "react";
import Jumptron from "../Components/LandingPage/Jumptron";
import KeyFeatures from "../Components/LandingPage/KeyFeatures";
import ChatDesign from "../Components/ChatBot/ChatDesign";
import Footer from "../Components/Layouts/Footers/Footer";
import Testimonals from "../Components/LandingPage/Testimonals";
import FAQ from "../Components/LandingPage/FAQ";

const LandingPage = () => {

  
  return (
    <div>
      <Jumptron />
      <KeyFeatures />
      <ChatDesign />
      <Testimonals />
      <FAQ />
      <Footer />
    </div>
  );
};

export default LandingPage;

