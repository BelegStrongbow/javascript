import { getUserId } from "./auth";
import getEnv from "./getEnv";

/*
 * Feature flags is the array of currently available feature flags.
 * To enable a certain feature for all users just remove the feature flag from this array.
 */
const featureFlags = [
];

/**
 * Returns whether or not the current user has access to a feature.
 *
 * @param {string} feature The feature to have access to.
 * @returns {boolean} Whether the current user has access to a feature.
 */
export function hasAccessToFeature( feature ) {
	if ( ! featureFlags.includes( feature ) ) {
		return true;
	}

	let userId = getUserId();

	let environmentVariable = "FEATURE_"  + feature;

	let usersWithAccess = getEnv( environmentVariable, "" ).split( "," );
	usersWithAccess = usersWithAccess.map( userId => userId.trim() );
	usersWithAccess = usersWithAccess.filter( userId => userId !== "" );

	return usersWithAccess.includes( userId );
}
