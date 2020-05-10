import React from "react";

const share = (props) => {
  return (
    <div className="name-item float-right">
      <h6>
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <i class="fa share-icon text-primary fa-share-alt"></i>
        </a>
        Share This
      </h6>
    </div>
  );
};

export default share;
