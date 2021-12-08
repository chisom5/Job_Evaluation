import React from "react";
import { Button, Drawer, Input } from "antd";
import { withContext } from "../../../config/contextConfig";

const EvaluationFactorTab = (props) => {
  return (
    <div className="tabs__content">
      <header style={{ marginBottom: "2px" }}>
        <p className="tabs__content_title">Evaluation</p>

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
        <p>
          Navigate between the factors using the tabs below to specify the
          appropriate weight and levels for each factor
        </p>

        <div className="eval__factor_container">
          {/*  */}
          <div
            style={{
              width: "71%",
              backgroundColor: "white",
              borderRadius: "12px",
              border: "1px solid #E8E9EB",
              padding: "1rem",
            }}
          >
            <div className="header">
              {props.factorsList &&
                  props.factorsList.map((content) => {
                  return (
                    <span
                    key={content.name}
                      className={[
                        "header__tag__btn",
                        props.value.active_editConfig === content.name
                          ? "active_editObj"
                          : null,
                      ].join(" ")}
                      onClick={() => props.value.updateFactor(content.name)}
                    >
                      {content.name}
                    </span>
                  );
                })}
            </div>
            <section>
              <h4>{props.value.active_editConfig}</h4>

              <div className="content__item">
                {props.factorsList &&
                  props.factorsList[0] &&
                  props.factorsList[0].factors.map((item, index) => {
                    return (
                      <div id="content__item_inner" key={index}>
                        <p>{item.header}</p>

                        {/* array content here */}
                        {item.levels &&
                          item.levels.map((level) => {
                            return (
                              <div className="level_container" key={level.id}>
                                <span className="level_no">{level.id}</span>

                                <div className="level_item">
                                  <span>{level.name}</span>
                                  <span
                                    id="cursor"
                                    onClick={() =>
                                      props.value.handleRemoveFromArr(
                                        item.header,
                                        level.id
                                      )
                                    }
                                  >
                                    <img
                                      src={
                                        require("../../../assets/images/cancel.svg")
                                          .default
                                      }
                                      alt="plus"
                                    />
                                  </span>
                                </div>
                              </div>
                            );
                          })}

                        {/* dynamic input */}
                        <div className="form_container">
                          <Input
                            type="text"
                            placeholder="Enter a level"
                            name="name"
                            value={props.value.name}
                            onChange={(e) => props.value.handleTextChange(e)}
                          />
                          <Button
                            className="btn_add"
                            onClick={() =>
                              props.value.handleAddToArray(item.header)
                            }
                          >
                            ADD
                            {/*  */}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                {/* left */}
              </div>
            </section>
          </div>

          <div className="eval__factor_summary">
            {/* summary */}
            <div id="summary_bg">
              <p>Summary</p>
              <div className="factor__weight">
                <span id="weight__val">100%</span>
                <p>Total Factors Weight</p>
              </div>
            </div>
            {/* factors */}

            <div className="factor__item_container">
              <div className="factor__item">
                <p>Knowledge</p>
                <span>22%</span>
              </div>
              <div className="factor__item">
                <p>Service Relationship</p>
                <span>15%</span>
              </div>
            </div>
          </div>
          {/* summary */}
        </div>
      </section>
    </div>
  );
};
export default withContext(EvaluationFactorTab);
