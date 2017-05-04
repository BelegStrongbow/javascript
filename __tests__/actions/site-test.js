import * as actions from "../../src/actions/site";
import { getApiUrl } from "../../src/functions/api";

jest.mock( "whatwg-fetch" );

test( 'site add subscription action creator', () => {
	const expected = {
		type: actions.SITE_TOGGLE_SUBSCRIPTION_REQUEST
	};

	const actual = actions.siteToggleSubscriptionRequest( );

	expect( actual ).toEqual( expected );
} );

test( 'site add subscription success creator', () => {
	const expected = {
		type: actions.SITE_ADD_SUBSCRIPTION_SUCCESS,
		siteId: "siteId",
		subscriptionId: "subscriptionId",
	};

	const actual = actions.siteAddSubscriptionSuccess( "siteId", "subscriptionId" );

	expect( actual ).toEqual( expected );
} );


test( 'site add subscription failure creator', () => {
	const expected = {
		type: actions.SITE_TOGGLE_SUBSCRIPTION_FAILURE,
		addingSubscriptionError: "Authorization Required",
	};
	const input = "Authorization Required";

	const actual = actions.siteToggleSubscriptionFailure( input );

	expect( actual ).toEqual( expected );
} );

jest.mock( "../../src/functions/auth", () => {
	return {
		getAccessToken: jest.fn( () => { return "access" } ),

	}
} );

let siteId = "123";
let subscriptionId = "112";

let expectedRequest = new Request( getApiUrl() + "/Sites/" + siteId + "/subscriptions/rel/" + subscriptionId + "/?access_token=access", {
	method: "PUT",
	headers: {
		"Content-Type": "application/json",
	},
} );

test( 'site add subscription action creator with success', () => {
	global.fetch = jest.fn( () => {
		return Promise.resolve( {
			status: 200,
			json: () => { return {
				"siteId": "siteId",
				"subscriptionId": "subscriptionId",
				"id": 8
			} },
		} );
	});

	const dispatch = jest.fn();

	const siteAddSubscriptionFunc = actions.siteAddSubscription( siteId, subscriptionId );

	expect( siteAddSubscriptionFunc ).toBeInstanceOf( Function );

	return siteAddSubscriptionFunc( dispatch ).then( () => {
		expect( global.fetch ).toHaveBeenCalledWith( expectedRequest );
		expect( dispatch ).toHaveBeenCalledWith( actions.siteToggleSubscriptionRequest() );
		expect( dispatch ).toHaveBeenCalledWith( actions.siteAddSubscriptionSuccess( siteId, subscriptionId ) );
	} );
} );

test( 'site add subscription action creator with failure', () => {
	global.fetch = jest.fn( () => {
		return Promise.resolve( {
			json: () => { return {
				"error": {
					"statusCode": 500,
					"name": "Error",
					"message": "Duplicate entry for Subscription.id",
					"stack": "Error: Duplicate entry for Subscription.id\n    at Memory._createSync"
				}
			} },
		} );
	});

	const dispatch = jest.fn();

	const siteAddSubscriptionFunc = actions.siteAddSubscription( siteId, subscriptionId );

	expect( siteAddSubscriptionFunc ).toBeInstanceOf( Function );

	return siteAddSubscriptionFunc( dispatch ).then( () => {
		expect( global.fetch ).toHaveBeenCalledWith( expectedRequest );
		expect( dispatch ).toHaveBeenCalledWith( actions.siteToggleSubscriptionRequest() );
		expect( dispatch ).toHaveBeenCalledWith( actions.siteToggleSubscriptionFailure( "Duplicate entry for Subscription.id" ) );
	} );
} );

test( 'site remove subscription action creator with success', () => {
	expectedRequest = new Request( getApiUrl() + "/Sites/" + siteId + "/subscriptions/rel/" + subscriptionId + "/?access_token=access", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	} );

	global.fetch = jest.fn( () => {
		return Promise.resolve( {
			status: 200,
			json: () => { return {
				"count": 1,
			} },
		} );
	});

	const dispatch = jest.fn();

	const siteRemoveSubscriptionFunc = actions.siteRemoveSubscription( siteId, subscriptionId );

	expect( siteRemoveSubscriptionFunc ).toBeInstanceOf( Function );

	return siteRemoveSubscriptionFunc( dispatch ).then( () => {
		expect( global.fetch ).toHaveBeenCalledWith( expectedRequest );
		expect( dispatch ).toHaveBeenCalledWith( actions.siteToggleSubscriptionRequest() );
		expect( dispatch ).toHaveBeenCalledWith( actions.siteRemoveSubscriptionSuccess( siteId, subscriptionId ) );
	} );
} );

test( 'site remove subscription action creator with failure', () => {
	expectedRequest = new Request( getApiUrl() + "/Sites/" + siteId + "/subscriptions/rel/" + subscriptionId + "/?access_token=access", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	} );

	global.fetch = jest.fn( () => {
		return Promise.resolve( {
			json: () => { return {
				"error": {
					"statusCode": 401,
					"name": "Error",
					"message": "Authorization Required",
					"code": "AUTHORIZATION_REQUIRED",
					"stack": "Dummydata"
				}
			} },
		} );
	});

	const dispatch = jest.fn();

	const siteRemoveSubscriptionFunc = actions.siteRemoveSubscription( siteId, subscriptionId );

	expect( siteRemoveSubscriptionFunc ).toBeInstanceOf( Function );

	return siteRemoveSubscriptionFunc( dispatch ).then( () => {
		expect( global.fetch ).toHaveBeenCalledWith( expectedRequest );
		expect( dispatch ).toHaveBeenCalledWith( actions.siteToggleSubscriptionRequest() );
		expect( dispatch ).toHaveBeenCalledWith( actions.siteToggleSubscriptionFailure( "Authorization Required" ) );
	} );
} );

test( 'site remove action creator with success', () => {
	expectedRequest = new Request( getApiUrl() + "/Sites/" + siteId + "/?access_token=access", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	} );

	global.fetch = jest.fn( () => {
		return Promise.resolve( {
			status: 200,
			json: () => { return {
				"count": 1,
			} },
		} );
	});

	const dispatch = jest.fn();

	const siteRemoveFunc = actions.siteRemove( siteId );

	expect( siteRemoveFunc ).toBeInstanceOf( Function );

	return siteRemoveFunc( dispatch ).then( () => {
		expect( global.fetch ).toHaveBeenCalledWith( expectedRequest );
		expect( dispatch ).toHaveBeenCalledWith( actions.siteRemoveStart( siteId ) );
		expect( dispatch ).toHaveBeenCalledWith( actions.siteRemoveSuccess( siteId ) );
	} );
} );

test( 'site remove action creator with failure', () => {
	expectedRequest = new Request( getApiUrl() + "/Sites/" + siteId + "/?access_token=access", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	} );

	global.fetch = jest.fn( () => {
		return Promise.resolve( {
			json: () => { return {
				"error": {
					"statusCode": 401,
					"name": "Error",
					"message": "Authorization Required",
					"code": "AUTHORIZATION_REQUIRED",
					"stack": "Dummydata"
				}
			} },
		} );
	});

	const dispatch = jest.fn();

	const siteRemoveFunc = actions.siteRemove( siteId );

	expect( siteRemoveFunc ).toBeInstanceOf( Function );

	return siteRemoveFunc( dispatch ).then( () => {
		expect( global.fetch ).toHaveBeenCalledWith( expectedRequest );
		expect( dispatch ).toHaveBeenCalledWith( actions.siteRemoveStart( siteId ) );
		expect( dispatch ).toHaveBeenCalledWith( actions.siteRemoveFailure( siteId, "Authorization Required" ) );
	} );
} );
