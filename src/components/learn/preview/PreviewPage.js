import React, { useContext, useEffect, useState } from "react";
import DisplayTopicNames from "../TopicNames/DisplayTopicNames";
import $ from "jquery";
import "./css/Preview-page.css";
import "./css/Preview-page-dark.css";
import { Accordion, Row, Col, Button } from "react-bootstrap";

import PreviewArticle from "./PreviewArticle";
import SpecialityPreviewArticle from "./SpecialityPreviewArticle";
import ReferralArticle from "../../referralSystem/referralArticle";

import { ArticlesContext } from "../../../contexts/articleContext";
import { SpecialityContext } from "../../../contexts/specialityContext";
import { TopicsContext } from "../../../contexts/topicContext";
import Footer from "../../layout/Footer/Footer";
import ShareIcon from "./shareIcon";
import { AuthContext } from "../../../contexts/authContext";
import Preloader from "../../Preloader/preloader";

const PreviewPage = (props) => {
  const [selected, setSelected] = useState(false);
  // const [loaded, setLoaded] = useState(true);
  const [showReferralArticle, setshowReferralArticle] = useState(false);
  const [referralTopicId, setreferralTopicId] = useState("");
  const [SelectedArticle, setSelectedArticle] = useState();

  useEffect(() => {
    $(".arrow-down").on("click", function () {
      $(this).toggleClass("down");
      // $(".topics-overview").toggleClass("highlight");
    });
  });

  const { articles } = useContext(ArticlesContext);
  const { specialities } = useContext(SpecialityContext);
  const { topics } = useContext(TopicsContext);
  const { authData } = useContext(AuthContext);

  const topicsData = topics && topics;
  const UnlockComplete = topicsData && topicsData.UnlockComplete;

  // const { UnlockComplete } = topics.UnlockComplete && topics.UnlockComplete;

  if (UnlockComplete) {
    window.location.reload();
  }

  const Articles = articles && articles.articles;
  const TopicNames = topics && topics.topics;
  const Specialities = specialities && specialities.specialities;
  const requiredSpeciality = props.match.params.specialityName;

  const displayArticle = (article) => {
    setSelectedArticle(article);
    setSelected(true);
  };

  const referralArticle = (id) => {
    setshowReferralArticle(true);
    setreferralTopicId(id);
    setSelected(false);
  };

  const hideReferralArticle = () => {
    setshowReferralArticle(false);
    setreferralTopicId("");
    setSelected(false);
  };

  const profile = authData && authData.userProfile;
  return (
    <div className="topics-ovr-cont">
      {TopicNames ? (
        <div>
          <div className="speciality-container">
            <div className="speciality-heading">
              <h2>{requiredSpeciality}</h2>
              <ShareIcon profile={profile} specaility={requiredSpeciality} />
            </div>
            <Row>
              <Col className="topic-ovr-container" lg={4}>
                <Accordion defaultActiveKey="0">
                  <div className="topics-overview">
                    <h3 style={{ fontSize: "1rem" }} className="overview">
                      Topics Overview
                    </h3>
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      className="float-right speciality-dropdown arrow-down"
                      eventKey="0"
                    >
                      <i
                        style={{ color: "#111", marginBottom: "10px" }}
                        className="fas list-down fa-angle-up"
                      ></i>
                    </Accordion.Toggle>
                  </div>
                  <br />

                  <Accordion.Collapse eventKey="0">
                    <div id="specialities" className="Topic-names ">
                      {Specialities &&
                        Specialities.map((item) => {
                          if (item.Name === requiredSpeciality) {
                            return (
                              <div key={item.id}>
                                <br />
                                <DisplayTopicNames
                                  SpecialityId={item.id}
                                  TopicNames={TopicNames}
                                  SpecialityName={requiredSpeciality}
                                  Articles={Articles}
                                  displayArticle={displayArticle}
                                  referralArticle={referralArticle}
                                />
                                <br />
                              </div>
                            );
                          }
                          return null;
                        })}
                    </div>
                  </Accordion.Collapse>
                </Accordion>
              </Col>

              <Col style={{ paddingLeft: 0, paddingRight: 0 }} l={8}>
                <div className="card-container ">
                  {selected ? (
                    <PreviewArticle
                      TopicNames={TopicNames}
                      SelectedArticle={SelectedArticle}
                    />
                  ) : showReferralArticle ? (
                    <ReferralArticle
                      topicId={referralTopicId}
                      hideReferralArticle={hideReferralArticle}
                    />
                  ) : (
                    <SpecialityPreviewArticle
                      Specialities={Specialities}
                      requiredSpeciality={requiredSpeciality}
                    />
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <Preloader />
      )}
      <Footer />
    </div>
  );
};

export default PreviewPage;
