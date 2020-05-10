import React from "react";
import { Link } from "react-router-dom";
import "./css/Preview-page.css";

const PreviewArticle = ({ TopicNames, SelectedArticle }) => {
  return (
    <div className="card">
      <div>
        {TopicNames &&
          SelectedArticle &&
          TopicNames.map((item) => {
            if (item.id === SelectedArticle.TopicId) {
              return (
                <div key={item.id}>
                  <h1 className="material-icons card-header">
                    {SelectedArticle.ArticleName}
                    <br />
                    <div>
                      <h3 className="float-right">{item.Name}</h3>
                    </div>
                  </h1>
                  <hr />
                  <div className="ql-snow">
                    <div
                      className="card-no-body ql-editor "
                      dangerouslySetInnerHTML={{
                        __html: SelectedArticle.ArticleContent,
                      }}
                    ></div>
                  </div>
                </div>
              );
            }
            return null;
          })}
      </div>
      <div>
        <Link
          to={
            "/" +
            SelectedArticle.SpecialityId +
            "/" +
            SelectedArticle.TopicId +
            "/" +
            SelectedArticle.id
          }
        >
          <h2 className="link">Read More.....</h2>
        </Link>
      </div>
    </div>
  );
};

export default PreviewArticle;
