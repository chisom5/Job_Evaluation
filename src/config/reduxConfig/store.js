import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./rootReducer";
import thunk from "redux-thunk";
const Middleware = [thunk];

let composeEnhancers = compose;
if (process.env.NODE_ENV === "development") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...Middleware))
);

export default store;
