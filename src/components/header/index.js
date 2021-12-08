import React from "react";
import "../componentStyle.scss";
import { withContext } from "../../config/contextConfig";

const Header = (props) => {
  return (
    <header className="header__container">
      <div className="header__inner">
        <div id="header__content_left">
          <div id="header__content_left__inner">
            <span>
              <img
                alt="logo"
                src={require("../../assets/images/logo.svg").default}
              />
            </span>
            <p className="header__tittle">Job Evaluation Tool</p>
            <span id="tag">Staff</span>
          </div>

          <p id="description">
            {props.value.isEditConfig
              ? `${props.value.headerTitle} / ${props.value.subTitle}`
              : props.value.headerTitle}
          </p>
        </div>

        <div id="header__content_right"></div>
      </div>
    </header>
  );
};

export default withContext(Header);
