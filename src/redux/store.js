import { legacy_createStore as createStore } from "redux";
import counterReducer from "./reducer";

const store = createStore(counterReducer);

export default store;