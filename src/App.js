import React from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./redux/store";
import { increment, decrement } from "./redux/action";

const Counter = () => {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <Counter/>
  </Provider>
);

export default App;