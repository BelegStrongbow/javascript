import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { login, fetchUser } from "./actions/user";
import { getAccessToken, getUserId } from "./functions/auth";
import { getAuthUrl } from "./functions/auth";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import Cookies from "js-cookie";
import { addLocaleData }from "react-intl";
import en from "react-intl/locale-data/en";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
addLocaleData( en );

let history = createHistory();

const loggerMiddleware = createLogger();

export const store = createStore(
	rootReducer,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware,
		routerMiddleware( history )
	)
);

let hasAccessToken = !! Cookies.get( "access_token" );

if ( hasAccessToken ) {
	store.dispatch( login( getAccessToken(), getUserId() ) );
	store.dispatch( fetchUser( getAccessToken(), getUserId() ) );
	ReactDOM.render(
		<App store={ store } history={ history }/>,
		document.getElementById( "root" )
	);
} else {
	document.location.href = getAuthUrl();
}
