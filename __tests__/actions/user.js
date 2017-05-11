import * as actions from "../../src/actions/user";
import { getApiUrl } from "../../src/functions/api";
import { getPasswordResetUrl } from "../../src/functions/auth";

jest.mock( "whatwg-fetch" );

test( 'login action creator', () => {
	const expected = {
		type: actions.LOGIN,
		data: {
			accessToken: "Access Token",
			userId: 5
		},
	};

	const actual = actions.login( "Access Token", 5 );

	expect( actual ).toEqual( expected );
} );

test( 'logout action creator', () => {
	const expected = {
		type: actions.LOGOUT,
	};

	const actual = actions.logout();

	expect( actual ).toEqual( expected );
} );

test( 'request user action creator', () => {
	const expected = {
		type: actions.FETCH_USER_REQUEST,
	};

	const actual = actions.requestUser();

	expect( actual ).toEqual( expected );
} );


test( 'request user action creator', () => {
	const expected = {
		type: actions.FETCH_USER_SUCCESS,
		user: {
			userData: "data",
		},
	};
	const input = {
		userData: "data",
	};

	const actual = actions.receiveUser( input );

	expect( actual ).toEqual( expected );
} );

test( 'fetch user action creator', () => {
	global.fetch = jest.fn( () => {
		return Promise.resolve( {
			json: () => { return "User data" },
		} );
	});

	const dispatch = jest.fn();

	const fetchUserFunc = actions.fetchUser( "AccessToken", 5 );

	expect( fetchUserFunc ).toBeInstanceOf( Function );

	return fetchUserFunc( dispatch ).then( () => {
		expect( dispatch ).toHaveBeenCalledWith( actions.requestUser() );
		expect( global.fetch ).toHaveBeenCalledWith( getApiUrl() + "/Customers/5/profile?access_token=AccessToken" );
		expect( dispatch ).toHaveBeenCalledWith( actions.receiveUser( "User data" ) );
	} );
} );

describe( 'Password reset', () => {
	test( 'request action', () => {
		const expected = {
			type: actions.RESET_PASSWORD_REQUEST,
		};

		const actual = actions.passwordResetRequest();

		expect( actual ).toEqual( expected );
	} );

	test( 'failure action', () => {
		const expected = {
			type: actions.RESET_PASSWORD_FAILURE,
			message: "message",
		};

		const actual = actions.passwordResetFailure( "message" );

		expect( actual ).toEqual( expected );
	} );

	test( 'success action', () => {
		const expected = {
			type: actions.RESET_PASSWORD_SUCCESS,
		};

		const actual = actions.passwordResetSuccess();

		expect( actual ).toEqual( expected );
	} );

	test( 'actual reset', () => {
		global.fetch = jest.fn( () => {
			return Promise.resolve( {
				status: 200,
				json: () => { return "Yay" },
			} );
		});

		const dispatch = jest.fn();

		const expectedBody = new FormData();
		expectedBody.append( "user_login", "email@email.email" );

		const expectedRequest = new Request(
			getPasswordResetUrl(),
			{
				method: "POST",
				body: expectedBody,
				mode: "no-cors",
			}
		);

		const resetPasswordFunc = actions.passwordResetSend( "email@email.email" );

		expect( resetPasswordFunc ).toBeInstanceOf( Function );

		return resetPasswordFunc( dispatch ).then( () => {
			expect( dispatch ).toHaveBeenCalledWith( actions.passwordResetRequest() );
			expect( global.fetch ).toHaveBeenCalledWith( expectedRequest );
			expect( dispatch ).toHaveBeenCalledWith( actions.passwordResetSuccess() );
		} );
	} );
} );

describe( 'Profile saving', () => {
	test( 'request action', () => {
		const expected = {
			type: actions.PROFILE_UPDATE_REQUEST,
		};

		const actual = actions.profileUpdateRequest();

		expect( actual ).toEqual( expected );
	} );

	test( 'failure action', () => {
		const expected = {
			type: actions.PROFILE_UPDATE_FAILURE,
			message: "message",
		};

		const actual = actions.profileUpdateFailure( "message" );

		expect( actual ).toEqual( expected );
	} );

	test( 'success action', () => {
		const expected = {
			type: actions.PROFILE_UPDATE_SUCCESS,
		};

		const actual = actions.profileUpdateSuccess();

		expect( actual ).toEqual( expected );
	} );

	test( 'actual profile save', () => {
		global.fetch = jest.fn( () => {
			return Promise.resolve( {
				status: 200,
				json: () => { return {
					email: "email@email.email",
				} },
			} );
		});

		const dispatch = jest.fn();

		const expectedBody = new FormData();
		expectedBody.append( "user_login", "email@email.email" );

		const apiUrl = getApiUrl();
		const userId = 1;

		let expectedRequest = new Request( `${apiUrl}/Customers//profile?access_token=`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify( { email: "email@email.email" } ),
		} );

		const saveProfileFunc = actions.updateProfile( { email: "email@email.email" } );

		expect( saveProfileFunc ).toBeInstanceOf( Function );

		return saveProfileFunc( dispatch ).then( () => {
			expect( dispatch ).toHaveBeenCalledWith( actions.profileUpdateRequest() );
			expect( global.fetch ).toHaveBeenCalledWith( expectedRequest );
			expect( dispatch ).toHaveBeenCalledWith( actions.profileUpdateSuccess( { email: "email@email.email" } ) );
		} );
	} );

	test( 'failed profile save', () => {
		global.fetch = jest.fn( () => {
			return Promise.resolve( {
				status: 404,
				json: () => {
					return {
						"error": {
							"statusCode": 404,
							"name": "Error",
							"message": "An error occurred",
							"code": "MODEL_NOT_FOUND",
							"stack": "Error: could not find a model with id 6"
						}
					}
				},
			} );
		});

		const dispatch = jest.fn();

		const resetPasswordFunc = actions.updateProfile( { email: "email@email.email" } );

		return resetPasswordFunc( dispatch ).then( () => {
			expect( dispatch ).toHaveBeenCalledWith( actions.profileUpdateRequest() );
			expect( dispatch ).toHaveBeenCalledWith( actions.profileUpdateFailure( "An error occurred" ) );

		} );
	} );
} );
