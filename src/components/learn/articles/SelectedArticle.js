/* eslint-disable */
import React, { useState, useContext } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./css/article.css";
import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import { ArticlesContext } from "../../../contexts/articleContext";
import $ from "jquery";

const SelectedArticle = (props) => {
  const [value, setValue] = useState(window.location.href);
  const [copied, setCopied] = useState(false);

  const { articles } = useContext(ArticlesContext);
  const Articles = articles && articles.articles;
  const { specialityId, topicId, Id } = props.match.params;
  const url = window.location.href;

  const goToTop = () => {
    $("html, body").animate({ scrollTop: 10 }, 600);
  };

  return (
    <div>
      <div className="selected-article">
        {Articles &&
          Articles.map((article) => {
            if (
              article.id === Id &&
              article.SpecialityId === specialityId &&
              article.TopicId === topicId
            ) {
              return (
                <Row key={article.id} className="full-view-article p-2">
                  <div className="share-icons">
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        copied ? (
                          <Tooltip id={"tooltip-right"}>
                            Link Copied to ClipBoard
                          </Tooltip>
                        ) : (
                          <Tooltip id={"tooltip-right"}>
                            Copy link to clipboard
                          </Tooltip>
                        )
                      }
                    >
                      <div id="link" className="link-icon">
                        <CopyToClipboard
                          text={value}
                          onCopy={() => setCopied(true)}
                        >
                          <i className="fas fa-link"></i>
                        </CopyToClipboard>
                      </div>
                    </OverlayTrigger>
                    <div></div>

                    <br />
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id={"tooltip-right"}>Share via mail</Tooltip>
                      }
                    >
                      <div className="mail-icon">
                        <a
                          className="mail-icon"
                          href={`mailto:?Subject=${
                            "Article on " + article.ArticleName
                          }&Body=Hey look i just found out this Amazing article on "${
                            article.ArticleName
                          }",Check it out : ${url}`}
                          target="_top"
                        >
                          <i className="fas fa-envelope"></i>
                        </a>
                      </div>
                    </OverlayTrigger>
                    <br />
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id={"tooltip-right"}>
                          Share on WhatsApp
                        </Tooltip>
                      }
                    >
                      <div>
                        <a
                          className="whatsapp-icon"
                          rel="noopener noreferrer"
                          href={`https://api.whatsapp.com/send?text=Hey look i just found out this Amazing article on "${article.ArticleName}",Check it out : ${url}`}
                          target="_blank"
                        >
                          <i className="fab fa-whatsapp"></i>
                        </a>
                      </div>
                    </OverlayTrigger>
                  </div>

                  <Col sm={3}>
                    {/* ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br /> */}
                  </Col>

                  <Col id="top" sm={6}>
                    <div className="ql-snow">
                      <div
                        className="full-article ql-editor"
                        dangerouslySetInnerHTML={{
                          __html: article.ArticleContent,
                        }}
                      ></div>
                    </div>
                    <a href="#">
                      <i
                        onClick={goToTop}
                        rel="nofollow"
                        id="go-to-top"
                        className=" top-icon fas fa-angle-double-up"
                      ></i>
                    </a>
                  </Col>

                  <Col sm={3}>
                    {/* ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br />
                    ads here
                    <br /> */}
                  </Col>
                </Row>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};

export default SelectedArticle;
