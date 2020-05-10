import React, { useContext } from "react";
import ArticleNames from "./articleNames";
import { SpecialityContext } from "../../../contexts/specialityContext";
import { TopicsContext } from "../../../contexts/topicContext";
import { ArticlesContext } from "../../../contexts/articleContext";

const Articles = (props) => {
  const { specialities } = useContext(SpecialityContext);
  const { topics } = useContext(TopicsContext);
  const { articles } = useContext(ArticlesContext);
  const { specialityName, topicName } = props.match.params;
  const Specialities = specialities && specialities.specialities;
  const Articles = articles && articles.articles;
  const TopicNames = topics && topics.topics;

  let content = null;
  if (Articles != null) {
    Specialities.map((item) => {
      if (item.Name === specialityName) {
        TopicNames.map((record) => {
          if (record.Name === topicName) {
            content = (
              <div>
                <ArticleNames
                  SpecialityId={item.id}
                  TopicId={record.id}
                  Articles={Articles}
                />
              </div>
            );
            return null;
          }
          return null;
        });
      }
      return null;
    });
  } else {
    content = <p>Loading...</p>;
  }
  return <div className="container-width">{content}</div>;
};

export default Articles;
