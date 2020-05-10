import React, { useState } from "react";
import { OverlayTrigger, Popover, Button, Tooltip } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import $ from "jquery";
import "./css/shre.css";

const ShareIcon = ({ specaility, profile }) => {
  const width = window.innerWidth;
  const url = window.location.href;

  var position;
  if (width < 500) {
    position = "bottom";
  } else {
    position = "left";
  }
  const [copied, setCopied] = useState(false);

  return (
    <div className="share-overlay">
      <OverlayTrigger
        trigger="click"
        key={position}
        placement={position}
        overlay={
          <Popover id={`popover-positioned-${position}`}>
            <Popover.Content bsPrefix="popover-body1">
              <div className="share-overlay-icons">
                <div className="icon">
                  <a
                    href={`https://api.whatsapp.com/send?text=Hey look i just found out this AmazingGuide on "${specaility} and use my referral code '${
                      profile && profile.referCode
                    }' to SignUp ",Check it out : ${url}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <img
                      src="https://www.svgrepo.com/show/303147/whatsapp-icon-logo.svg"
                      alt=""
                    />
                  </a>
                </div>

                <div className="icon">
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      copied ? (
                        <Tooltip id={"tooltip-bottom"}>
                          Link Copied to ClipBoard
                        </Tooltip>
                      ) : (
                        <Tooltip id={"tooltip-right"}>
                          Copy link to clipboard
                        </Tooltip>
                      )
                    }
                  >
                    <div id="link" className="">
                      <CopyToClipboard
                        text={url}
                        onCopy={() => setCopied({ copied: true })}
                      >
                        <img
                          src="https://www.svgrepo.com/show/200099/link.svg"
                          alt=""
                        />
                      </CopyToClipboard>
                    </div>
                  </OverlayTrigger>
                </div>
                <div className="icon">
                  <a
                    href={`mailto:?Subject=${
                      "Learn" + specaility
                    }&Body=Hey look i just found out this Amazing guide on "${specaility}", use my referral code '${
                      profile && profile.referCode
                    }' to SignUp , check it out  ${url}`}
                    target="_top"
                  >
                    <img
                      src="https://www.svgrepo.com/show/303161/gmail-icon-logo.svg"
                      alt=""
                    />
                  </a>
                </div>
                <div className="icon">
                  <a
                    href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                    class="twitter-share-button"
                    data-text="Hey look I just found out this amazing Website to learn WebDevelopment, check it out"
                    data-show-count="false"
                  >
                    <img
                      src="https://www.svgrepo.com/show/20626/twitter.svg"
                      alt=""
                    />
                  </a>
                  <script
                    async
                    src="https://platform.twitter.com/widgets.js"
                    charset="utf-8"
                  ></script>
                </div>
              </div>
            </Popover.Content>
          </Popover>
        }
      >
        <Button variant="link">
          <img src="https://www.svgrepo.com/show/149246/share.svg" alt="" />{" "}
        </Button>
      </OverlayTrigger>{" "}
    </div>
  );
};

export default ShareIcon;
