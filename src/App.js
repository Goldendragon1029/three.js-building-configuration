import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Toolbar from "./components/toolbar";
import MainView from "./components/mainView";

const App = () => (
  <Provider store={store}>
    <div className="flex">
      <Toolbar />
      <MainView />
    </div>
  </Provider>
);

export default App;