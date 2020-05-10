import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

const LockedUnlockedTopic = ({ topic, unhideToggle }) => {
  const { authData } = useContext(AuthContext);
  const credentials = authData && authData.userProfile;

  return (
    <div>
      {topic.locked ? (
        <div>
          {credentials ? (
            credentials.UnlockedTopicId &&
            credentials.UnlockedTopicId.length === 0 ? (
              <div className="float-right" key={topic.id}>
                <div className="lock-container">
                  <span className="lock"></span>
                </div>
              </div>
            ) : (
              credentials.UnlockedTopicId &&
              credentials.UnlockedTopicId.map((id) => {
                if (topic.id === id.id) {
                  return (
                    <div
                      className="float-right"
                      key={topic.id + id.id}
                      onClick={unhideToggle()}
                    >
                      <i className="fas fa-unlock-alt"></i>
                    </div>
                  );
                } else {
                  return (
                    <div className="float-right" key={topic.id}>
                      <div className="lock-container">
                        <span className="lock"></span>
                      </div>
                    </div>
                  );
                }
              })
            )
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default LockedUnlockedTopic;
