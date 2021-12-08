import React from "react";
import { Button, Drawer } from "antd";
import { withContext } from "../../../config/contextConfig";

const EvaluationJobDetails = (props) => {
  return (
    <div className="tabs__content job_listing">
      <header>
        <p className="tabs__content_title">Job Details</p>

        <div>
          <Button
            className="btn__comment"
            icon={
              <img
                src={require("../../../assets/images/chat-bubble.svg").default}
                alt="chats"
                style={{ marginRight: "8px" }}
              />
            }
            onClick={() => props.value.showDrawer()}
          >
            Comments
          </Button>
        </div>

        <Drawer
          title={null}
          placement="right"
          closable={false}
          onClose={() => props.value.onClose()}
          visible={props.value.isDrawer}
        >
          <h4 className="title">Comments</h4>
          <div className="comment__content">
            <div className="empty">
              <img
                src={require("../../../assets/images/chat-empty.svg").default}
                alt="empty_comment"
              />
              <p>No comments yet</p>
            </div>
          </div>
        </Drawer>
      </header>
      <section className="other__content">
        <div className="matrices__content"> </div>
      </section>
    </div>
  );
};
export default withContext(EvaluationJobDetails);
