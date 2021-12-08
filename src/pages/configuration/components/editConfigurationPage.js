import React from "react";
import { Button, Input, InputNumber } from "antd";
import { withContext } from "../../../config/contextConfig";

const EditConfiguration = (props) => {
  return (
    <div className="editConfig__wrapper">
      <div className="header">
        {props.value.fixedDimensionHeader &&
          props.value.fixedDimensionHeader.map((content) => {
            return (
              <span
                className={[
                  "header__tag__btn",
                  props.value.active_editConfig === content.title
                    ? "active_editObj"
                    : null,
                ].join(" ")}
                onClick={() => props.value.updateFactor(content.title)}
                key={content.title}
              >
                {content.title}
              </span>
            );
          })}
      </div>

      <section className="content">
        <h4>{props.value.active_editConfig}</h4>

        {props.value.active_editConfig === "Dimensions/Levels" && (
          <div className="content__item">
            {props.value.configurationObj.dimensions &&
              props.value.configurationObj.dimensions.map((item, index) => {
                return (
                  <div id="content__item_inner" key={item.id}>
                    <p>{item.label}</p>

                    {/* array content here */}
                    {item.levels &&
                      item.levels
                        .sort((a, b) => a.order - b.order)
                        .map((level) => {
                          return (
                            <div className="level_container" key={level.id}>
                              <span className="level_no">{level.order}</span>

                              <div className="level_item">
                                <span>{level.label}</span>
                                <span
                                  id="cursor"
                                  onClick={() =>
                                    props.value.handleRemoveFromArr(
                                      item,
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
                        defaultValue={props.value.name}
                        onChange={(e) => props.value.handleTextChange(e)}
                      />
                      <Button
                        className="btn_add"
                        loading={props.value.creatingLevel}
                        onClick={() =>
                          props.value.handleAddToArray(item, item.id)
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
        )}

        {props.value.active_editConfig === "Multiplication Factor" && (
          <div id="content__item_inner" style={{ width: "100%" }}>
            {props.value.configurationObj.multipliers &&
              props.value.configurationObj.multipliers
                .sort((a, b) => a.multiple - b.multiple)
                .map((item, index) => {
                  return (
                    <div className="multipler_container" key={item.id}>
                      <div className="multipler_score">
                        <span>{item.multiple}</span>
                      </div>

                      <div className="multipler_option">
                        <span>{item.label}</span>
                      </div>
                      <div className="multipler_cancel">
                        <span
                          id="cursor"
                          onClick={() =>
                            props.value.handleRemoveFromArr(
                              item,
                              item.id
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
            <div
              className="form_container"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              <span>
                <InputNumber
                  style={{ width: "70px", marginRight: "1rem" }}
                  type="text"
                  placeholder="Score"
                  name="multiple"
                  onChange={(e) =>
                    props.value.handleNumberChange(e, "multiple")
                  }
                />
              </span>
              <Input
                style={{ width: "100%" }}
                type="text"
                placeholder="Enter an option"
                name="label"
                onChange={(e) => props.value.handleTextChange(e)}
              />
              <Button
                className="btn_add"
                onClick={() => props.value.handleAddToMultipler()}
              >
                ADD
                {/*  */}
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* <div className="btn_group">
        <Button id="cancel_btn" onClick={() => props.value.goBackToHomePage()}>
          Cancel
        </Button>
        <Button className="btn_primary">Save Changes</Button>
      </div> */}
    </div>
  );
};

export default withContext(EditConfiguration);
