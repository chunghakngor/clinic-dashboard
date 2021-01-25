import { combineReducers } from "redux";
import authReducer from "./authReducer";
import loginReducer from "./loginReducer";

export const rootReducer = combineReducers({ authReducer, loginReducer });

export type RootState = ReturnType<typeof rootReducer>;
