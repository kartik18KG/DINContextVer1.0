import React from "react";
import ArticleContent from "./articleContent";
import AddArticle from "./addArticle";
// import UpdateArticle from "./updateArticle";

class ArticleNames extends React.Component {
  state = {};
  handleClick = (e) => {
    console.log(e);
    this.setState({
      ShowArticle: true,
      ArticleId: e,
    });
  };
  render() {
    const { SpecialityId, TopicId, Articles } = this.props;
    return (
      <div>
        {Articles &&
          Articles.map((item) => {
            if (
              item.SpecialityId === SpecialityId &&
              item.TopicId === TopicId
            ) {
              return (
                <div className="card m-4" key={item.id}>
                  <div className="card-body">
                    <h2>{item.ArticleName}</h2>
                    <button
                      className="btn btn-outline-primary float-right"
                      onClick={() => this.handleClick(item.id)}
                    >
                      Read
                    </button>
                  </div>
                </div>
              );
            }
            return null;
          })}
        {this.state.ShowArticle && (
          <ArticleContent ArticleId={this.state.ArticleId} />
        )}
        <AddArticle SpecialityId={SpecialityId} TopicId={TopicId} />
      </div>
    );
  }
}

export default ArticleNames;
