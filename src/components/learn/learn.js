import React, { useContext } from "react";
import Card from "./learningCards/Card";
import Footer from "../layout/Footer/Footer";
import { SpecialityContext } from "../../contexts/specialityContext";
import { motion } from "framer-motion";
import { Button } from "react-bootstrap";
import Preloader from "./TopicNames/Preloader/preloader";
import { NavLink } from "react-router-dom";

const Learn = () => {
  const { specialities } = useContext(SpecialityContext);
  const LearnCards = specialities && specialities.specialities;

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      {LearnCards ? (
        <div>
          <div className="container learn-container">
            <div className="flex">
              <Card learningCards={LearnCards} />
            </div>
            <div className="clear-flex"></div>
            <div className="mb-3 ml-3 mr-3">
              <div className="text-center">
                <NavLink to="/addcard">
                  <Button>Add Card</Button>
                </NavLink>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <Preloader />
      )}
    </motion.div>
  );
};

export default Learn;
