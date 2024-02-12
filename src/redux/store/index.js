import { configureStore } from "@reduxjs/toolkit";
import Reducer from "../reducers/index";

const store = configureStore({
  reducer: Reducer,
});

export default store;
