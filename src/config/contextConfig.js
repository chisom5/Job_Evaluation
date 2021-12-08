import React from "react";

export const ConfigContext = React.createContext();

export const withContext = Component => {
  return props => (
    <ConfigContext.Consumer>
      {value => <Component {...props} value={value} />}
    </ConfigContext.Consumer>
  );
};
