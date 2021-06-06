import { combineReducers, configureStore } from "@reduxjs/toolkit";
import chatReducer from "./reducers/chatSlice";

const rootReducer = combineReducers({
  listMess: chatReducer,
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;
