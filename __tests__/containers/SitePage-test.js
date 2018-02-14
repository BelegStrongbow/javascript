import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../src/containers/SitePage'
import { siteRemove } from "../../src/actions/site";

jest.mock( "../../src/actions/site", () => {
	return {
		siteRemove: ( siteId ) => { return true; },
	};
} );

test('the mapStateToProps function', () => {
	let state = {
			entities: {
				sites: {
					byId: {
						"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
							"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
							"url": "http://yoast.com",
							"creationDate": "2017-03-21T08:54:09.415Z",
							"userId": 1,
						}
					},
					allIds: [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
				},
				subscriptions: {
					byId: {
						"subscriptiontestId": {
							id: "subscriptiontestId",
							productId: "productid1",
							startDate: "2017-04-12T00:00:00.000Z",
							endDate: "2017-04-12T00:00:00.000Z",
							subscriberId: 2,
							licenses: {
								amountAvailable: 11,
								amountUsed: 5,
								addMoreLicenses: "Add more licenses",
							},
							product: {
								id: "productid1",
								name: "string",
								description: "string",
								storeUrl: "string",
								downloadUrl: "string",
								isDownloadOnly: false,
								icon: "https://image.flaticon.com/teams/new/1-freepik.jpg",
								shopProductType: "string",
								shopStatus: "string",
								price: 0,
								shopRegularPrice: 0,
								shopTaxStatus: "string",
								shopTaxClass: "string",
								lastUpdated: "2017-04-26T11:21:02.597Z",
								currentVersion: 0,
								changelog: "string"
							},
							used: 1,
						},
					},
					allIds: [ "subscriptiontestId" ],
				},
				products: {
					byId: {
						"productid1": {
							id: "productid1",
							name: "Yoast SEO Premium",
							type: "plugin",
							icon: "icon.png",
							currency: "USD",
							price: 123,
							glNumber: 222,
						},
						"productid2": {
							id: "productid2",
							name: "Yoast SEO Local",
							type: "plugin",
							icon: "icon.png",
							currency: "USD",
							price: 123,
							glNumber: 111,
						},
					},
					allIds: [ "productid1", "productid2" ],
				}
			},
			router: {
				location: "sites/497490e6-eb8d-4627-be9b-bfd33fc217f1",
			},
			ui: {
				subscriptions: {
					requesting: false,
				},
				site: {
					removing: false,
					subscriptions: {
						error: "",
						toggling: false,
					},
				},
			},
	};

	let ownProps = {
		match: {
			params: {
				id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			},
		},
	};

	let expected = {
		site: {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1,
		},
		subscriptions: [ {
			id: "subscriptiontestId",
			productId: "productid1",
			startDate: "2017-04-12T00:00:00.000Z",
			endDate: "2017-04-12T00:00:00.000Z",
			subscriberId: 2,
			licenses: {
				amountAvailable: 11,
				amountUsed: 5,
				addMoreLicenses: "Add more licenses",
			},
			product: {
				id: "productid1",
				name: "string",
				description: "string",
				storeUrl: "string",
				downloadUrl: "string",
				isDownloadOnly: false,
				icon: "https://image.flaticon.com/teams/new/1-freepik.jpg",
				shopProductType: "string",
				shopStatus: "string",
				price: 0,
				shopRegularPrice: 0,
				shopTaxStatus: "string",
				shopTaxClass: "string",
				lastUpdated: "2017-04-26T11:21:02.597Z",
				currentVersion: 0,
				changelog: "string"
			},
			used: 1,
			price: 0,
			productLogo: "https://image.flaticon.com/teams/new/1-freepik.jpg",
			isEnabled: false,
		} ],
		plugins: [
			{
				ids: [ "productid2" ],
				name: "Yoast SEO Local",
				type: "plugin",
				icon: "icon.png",
				currency: "USD",
				price: 123,
				used: 0,
				limit: 0,
				isEnabled: false,
				isAvailable: false,
				hasSubscriptions: false,
				subscriptionId: "",
				glNumber: 111,
			},
			{
				ids: [ "productid1" ],
				name: "Yoast SEO Premium",
				type: "plugin",
				icon: "icon.png",
				currency: "USD",
				price: 123,
				used: 0,
				limit: 0,
				isEnabled: false,
				isAvailable: false,
				hasSubscriptions: false,
				subscriptionId: "",
				glNumber: 222,
			},
		],
		loadingSubscriptions: false,
		uiSite: {
			removing: false,
			subscriptions: {
				error: "",
				toggling: false,
			},
		},
	};

	expect( mapStateToProps( state, ownProps ) ).toEqual( expected );

} );

test('the mapDispatchToProps function to call siteRemove action with onRemove when confirm is true', () => {
	global.window = {};
	global.window.confirm = jest.fn( ( msg ) => { return true; } );

	const dispatch = jest.fn();
	let ownProps = {
		match: {
			params: {
				id: 123,
			},
		},
	};

	let props = mapDispatchToProps( dispatch, ownProps );

	props.onRemove();

	expect( dispatch ).toHaveBeenCalledWith( siteRemove( 123 ) );
} );

test('the mapDispatchToProps function to NOT call siteRemove action with onRemove when confirm is false', () => {
	global.window = {};
	global.window.confirm = jest.fn( ( msg ) => { return false; } );

	const dispatch = jest.fn();
	let ownProps = {
		match: {
			params: {
				id: 123,
			},
		},
	};

	let props = mapDispatchToProps( dispatch, ownProps );

	props.onRemove();

	expect( dispatch ).not.toHaveBeenCalledWith( siteRemove( 123 ) );
} );
