import { getAuthUrl, removeCookies as removeAuthCookies, getAccessToken } from "./auth";
import getEnv from "./getEnv";

/**
 * Returns the API URL that should be used to do AJAX requests to.
 *
 * @returns {string} The URL of the API.
 */
export function getApiUrl() {
	return getEnv( "API_URL", "http://localhost:3000/api" );
}

/**
 * Checks a response for a 401 status code and redirects if present.
 *
 * @param {Object} response The response that needs to be checked for a 401.
 * @returns {Object} Returns the unaltered object if no 401 is present.
 */
export function handle401( response ) {
	if ( response.status === 401 ) {
		removeAuthCookies();
		document.location.href = getAuthUrl();
		throw new Error( "Authentication required" );
	}

	return response;
}

/**
 * Checks a response for an error status code and throws an error if present.
 *
 * @param {Object} response The response that needs to be checked for an error status code.
 * @returns {Object} Returns the unaltered object if no error status code is present.
 *
 */
export function verifyStatusCode( response ) {
	// The server returns a 204 with DELETE responses.
	if ( response.status !== 200 && response.status !== 204 ) {
		let error = response.statusText;
		// On no-cors request the error is not set.
		if ( response.json().error ) {
			error = response.json().error.message;
		}
		throw new Error( error );
	}

	return response;
}

/**
 * Returns the invoice URL for a certain order.
 *
 * @param {string} orderId The id of the order.
 * @returns {string} The URL to the order invoice.
 */
export function getInvoiceUrl( orderId ) {
	return getApiUrl() + "/Orders/" + orderId + "/invoice?access_token=" + getAccessToken();
}
