import { combineReducers } from "@reduxjs/toolkit";

import headerReducer from "./slice/headerSlice.ts";
import authReducer from "./slice/authSlice";
import uiReducer from "./slice/specialUISlice";

const rootReducer = combineReducers({
  header: headerReducer,
  auth: authReducer,
  specialUI: uiReducer,
});

export default rootReducer;
