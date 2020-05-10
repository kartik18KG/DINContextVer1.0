/* eslint-disable */
import React, { useContext, useState, useEffect } from "react";
import { Accordion, Button } from "react-bootstrap";
import $ from "jquery";
import { NavLink } from "react-router-dom";
import AddTopicName from "./AddTopicName";
import DeleteButton from "../DeleteButton";
import UpdateTopicName from "./UpdateTopicName";
// import AddArticle from "../articles/addArticle";
// import UpdateArticle from "../articles/updateArticle";
import DeleteArticle from "../DeleteButton";
import LockedUnlockedTopic from "../../referralSystem/lockedUnlockedTopics";
import "./css/Article-names.css";
import { getProfile } from "../../../crudFunctions/authFunctions";
import { AuthContext } from "../../../contexts/authContext";

const DisplayTopicNames = (props) => {
  const { isAdmin, authState, dispatch } = useContext(AuthContext);

  const [unhideToggle, setUnhideToggle] = useState(false);

  const {
    SpecialityId,
    TopicNames,
    Articles,
    displayArticle,
    referralArticle,
  } = props;

  useEffect(() => {
    getProfile(authState.uid, dispatch);
  }, []);

  const checkLocked = (topic) => {
    if (topic.locked === true && unhideToggle === false) {
      referralArticle(topic.id);
    }
  };

  const UnhideToggle = () => {
    setUnhideToggle(true);
  };
  //We can't put space in any topic name
  return (
    <div>
      {TopicNames &&
        TopicNames.map((item) => {
          if (SpecialityId === item.SpecialityId) {
            return (
              <div
                className="p-0 speciality-topic-container m-1"
                key={item.id}
                onClick={() => checkLocked(item)}
              >
                <h4 className="float-left topicName">{item.Name}</h4>
                <Accordion>
                  {item.locked != true || unhideToggle === true ? (
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      bsPrefix=""
                      className="float-right  arrow-down"
                      eventKey={item.Name.split(/\s/).join("")}
                      onClick={() => {
                        $(
                          `.fa-angle-down#${item.Name.split(/\s/).join("")}`
                        ).toggleClass("rotate");
                      }}
                    >
                      <i
                        id={item.Name.split(/\s/).join("")}
                        type="button"
                        className="fas article-dwn fa-angle-down"
                      ></i>
                    </Accordion.Toggle>
                  ) : (
                    <LockedUnlockedTopic
                      topic={item}
                      unhideToggle={UnhideToggle}
                    />
                  )}
                  {/* Lock color should be faded grey */}
                  <div>
                    <div className="clearflex"></div>

                    <div className="float-right">
                      {isAdmin
                        ? $(
                            <DeleteButton
                              key={"del" + item.id}
                              collectionName="TopicNames"
                              DocId={item.id}
                              size="small"
                            />
                          )
                        : null}
                    </div>
                    <div className="clearflex"></div>
                    {isAdmin ? (
                      <div className="float-right">
                        <div className="float-right">
                          <UpdateTopicName Topic={item} />
                        </div>
                      </div>
                    ) : null}
                    <div className="clearflex"></div>
                    <div className="float-right">
                      {isAdmin ? (
                        <NavLink
                          to={
                            "/article/add/" + item.SpecialityId + "/" + item.id
                          }
                        >
                          <i className="fas fa-plus"></i>
                        </NavLink>
                      ) : null}
                    </div>
                  </div>
                  <br />
                  <hr />
                  <Accordion.Collapse eventKey={item.Name.split(/\s/).join("")}>
                    <div>
                      <ol>
                        {Articles &&
                          Articles.map((article) => {
                            if (item.id == article.TopicId) {
                              return (
                                <div className="read-icon " key={article.id}>
                                  <br />
                                  <br />

                                  <div className="row">
                                    <div className=" read col-10">
                                      <div className="item">
                                        <a
                                          type="button"
                                          onClick={() => {
                                            displayArticle(article);
                                          }}
                                          className="display-article"
                                        >
                                          <li className="article-name m-0">
                                            {article.ArticleName}
                                          </li>
                                        </a>
                                        <a
                                          type="button"
                                          onClick={() => {
                                            displayArticle(article);
                                          }}
                                          className="fa-pull-right mr-4 pr-2"
                                        >
                                          <span className="">
                                            <img
                                              className="pt-2"
                                              style={{ width: "20px" }}
                                              src="https://www.svgrepo.com/show/21266/open-book.svg"
                                              alt=""
                                            />
                                          </span>
                                        </a>
                                      </div>
                                    </div>
                                    <div className=" col-2">
                                      <div className="update-delete float-right">
                                        {isAdmin ? (
                                          <div>
                                            <DeleteArticle
                                              collectionName="Articles"
                                              DocId={article.id}
                                              size="small"
                                            />
                                          </div>
                                        ) : null}
                                        <div>
                                          {isAdmin ? (
                                            <NavLink
                                              className="pr-4"
                                              to={
                                                "/article/update/" +
                                                item.SpecialityId +
                                                "/" +
                                                item.id +
                                                "/" +
                                                article.id
                                              }
                                            >
                                              <i className="fas fa-edit"></i>
                                            </NavLink>
                                          ) : null}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            } else {
                              return null;
                            }
                          })}
                      </ol>
                    </div>
                  </Accordion.Collapse>
                </Accordion>
                <br />
              </div>
            );
          }
        })}
      <AddTopicName SpecialityId={SpecialityId} />
    </div>
  );
};

export default DisplayTopicNames;
