import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import DeleteButton from "../DeleteButton";
import "./css/card2.css";
import SomeButton from "../../layout/Button/button";
import { AuthContext } from "../../../contexts/authContext";

const Card = (props) => {
  const { learningCards } = props;
  const { isAdmin, authState } = useContext(AuthContext);
  const uid = authState && authState.uid;
  return (
    <div className="learn-container">
      <div className="container pt-4">
        <div className="row">
          {learningCards &&
            learningCards.map((item) => {
              return (
                <div key={item.id} className="col-lg-6">
                  <div className="card">
                    <div className="imgBx">
                      <img
                        alt="speciality"
                        className="image"
                        src={item.imageUrl}
                      />
                    </div>
                    <div className="contentBx">
                      <h2> {item.Name}</h2>
                      {isAdmin ? (
                        <Row>
                          <Col>
                            <NavLink to={"/updatespeciality/" + item.id}>
                              <i
                                className="fa fa-edit"
                                type="button"
                                data-toggle="modal"
                              >
                                <strong></strong>
                              </i>
                            </NavLink>
                            <DeleteButton
                              collectionName="Specialities"
                              DocId={item.id}
                              size="small"
                            />
                          </Col>
                        </Row>
                      ) : null}
                      {uid ? (
                        <a href={"/learn/" + item.Name}>
                          <SomeButton buttonText={"Start Now"} />
                        </a>
                      ) : (
                        <NavLink to={"/learn/" + item.Name}>
                          <SomeButton buttonText={"Login to Start"} />
                        </NavLink>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Card;
