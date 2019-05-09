import { createStore, applyMiddleware } from "redux";
import { addressBookReducer } from "../reducers/addressBook.reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export const addressBookStore = createStore(
  addressBookReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
