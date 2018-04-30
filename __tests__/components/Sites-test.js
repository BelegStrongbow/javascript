import React from 'react';
import { createComponentWithIntl } from "../../utils";

import Sites from '../../src/components/Sites';

let plugins = [
	{
		glNumber: 111,
		ids: [ "1" ],
		icon: "test.jpg",
		name: "Test",
	},
	{
		glNumber: 222,
		ids: [ "2" ],
		icon: "test.jpg",
		name: "Test2",
	},
	{
		glNumber: 333,
		ids: [ "3" ],
		icon: "test.jpg",
		name: "Test3",
	},
	{
		glNumber: 444,
		ids: [ "4" ],
		icon: "test.jpg",
		name: "Test4",
	}
];

let activeSubscriptions = [
	{
		productId: "1",
	},
	{
		productId: "2",
	},
]

test('the sites component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<Sites onManage={ ( sitesId ) => {
				return sitesId;
			} }
			sites={[
				{ id: "7e54b616-59a7-4389-af3e-c2e0c093b955",
					siteName: "www.yoast.com",
					activeSubscriptions: activeSubscriptions,
					siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
				},
				{ id: "7e54b616-59a7-4389-af3e-c2e0c093b954",
					siteName: "www.google.com",
					activeSubscriptions: activeSubscriptions,
					siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
				},
				{ id: "7e54b616-59a7-4389-af3e-c2e0c093b956",
					siteName: "www.facebook.com",
					activeSubscriptions: activeSubscriptions,
					siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
				},
				] }
			plugins= { plugins }
			sitesFromStore={[
				{ "497490e6-eb8d-4627-be9b-bfd33fc217f1":{
						"creationDate": "2017-03-21T08:54:09.415Z",
						"hostname": "yoast.com",
						"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						"path": "/extrapath",
						"subscriptions": ["497490e6-eb8d-4627-be9b-bfd33fc217f1"],
						"url": "https://yoast.com",
						"userId": 1
					} },
				{},
			]}/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
