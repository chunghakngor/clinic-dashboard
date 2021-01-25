import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import { createStore } from "redux";
import { Provider } from "react-redux";

import { rootReducer } from "./redux/reducers";

const globalStore = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={globalStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
