import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";
import { useHistory } from "react-router";
import "../componentStyle.scss";
import { withContext } from "../../config/contextConfig";

const Sidebar = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const history = useHistory();

  useEffect(() => {
    switch (props.value.pathname) {
      case "/evalution":
        setActiveIndex(0);
        break;

      case "/job_description":
        setActiveIndex(1);
        break;
      case "/users":
        setActiveIndex(2);
        break;

      case "/settings":
        setActiveIndex(3);
        break;

      default:
        setActiveIndex(0);
        break;
    }
  }, [props.value.pathname]);

  const handleNav = (id, path) => {
    switch ((id, path)) {
      case 0:
        setActiveIndex(0);
        history.push(path);
        break;

      case 1:
        setActiveIndex(1);
        history.push(path);
        break;
      case 2:
        setActiveIndex(2);
        history.push(path);
        break;

      case 3:
        setActiveIndex(3);
        history.push(path);
        break;

      default:
        setActiveIndex(0);
        history.push(path);
        break;
    }
  };
  return (
    <div className="sidebar__container">
      <div className="sidebar__inner">
        {props.value.menu?.map((item) => {
          return (
            <div
              key={item.id}
              className={[
                "menu_item",
                item.id === activeIndex ? "menu_item_active" : null,
              ].join(" ")}
              onClick={() => handleNav(item.id, item.path)}
            >
              <Tooltip placement="rightTop" title={item.name}>
                <img
                  src={
                    item.id === activeIndex
                      ? item.icon_active
                      : item.icon_default
                  }
                  alt="menu_icon"
                />
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default withContext(Sidebar);
