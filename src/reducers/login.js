import {
	LOGIN_FAILURE, LOGIN_OAUTH_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
} from "../actions/login";


/**
 * Initial state
 */
const rootState = {
	ui: {
		login: {
			loading: false,
			error: "",
		},
	},
};

/**
 * Reducers
 */

/**
 * A reducer for the orders object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated Orders object.
 */
export function uiLoginReducer( state = rootState.ui.login, action ) {
	switch ( action.type ) {
		case LOGIN_SUCCESS:
			return Object.assign( {}, state, {
				loading: false,
				error: "",
			} );
		case LOGIN_FAILURE:
			return Object.assign( {}, state, {
				loading: false,
				error: action.error,
				oauthError: false,
			} );
		case LOGIN_OAUTH_FAILURE:
			return Object.assign( {}, state, {
				loading: false,
				error: action.error,
				oauthError: true,
			} );
		case LOGIN_REQUEST:
			return Object.assign( {}, state, {
				loading: true,
			} );
		default:
			return state;
	}
}
