import React, { useContext } from "react";
import TopSection from "./topSection";
import BottomSection from "./bottomSection";
import "./css/lightMode/home.css";
import "./css/lightMode/topSection.css";
import "./css/lightMode/bottomSection.css";
import "./css/darkMode/topSectionDark.css";
import "./css/darkMode/bottomSection.css";
import { HomeContext } from "../../contexts/homeContext";
import Preloader from "../Preloader/preloader";
import { motion } from "framer-motion";

const Home = () => {
  const { home } = useContext(HomeContext);
  const homeContent = home && home.home;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        {homeContent ? (
          <div className="home-container">
            <TopSection />
            <BottomSection />
          </div>
        ) : (
          <Preloader />
        )}
      </div>
    </motion.div>
  );
};

export default Home;
