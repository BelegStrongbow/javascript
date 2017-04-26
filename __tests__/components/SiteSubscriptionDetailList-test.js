import React from 'react';
import { createComponentWithIntl } from "../../utils";

import SiteSubscriptionDetailList from '../../src/components/SiteSubscriptionDetailList';
import SeoIcon from "../../src/icons/Yoast/Yoast_SEO_Icon_Small.svg";
import LocalIcon from "../../src/icons/Yoast/Local_SEO_Icon_Small.svg";

test('the site subscription detail list component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SiteSubscriptionDetailList
			siteSubscriptions={ [
				{
					id: "bla",
					productId: "Yoast SEO",
					startDate: "2017-04-11T00:00:00.000Z",
					endDate: "2017-04-11T00:00:00.000Z",
					reoccurring: true,
					subscriberId: 2,
					slots: {
						amountAvailable: 10,
						amountUsed: 5,
						addMoreSlots: "Add more slots",
					},
					product: {
						id: "productid",
						name: "string",
						description: "string",
						storeUrl: "string",
						downloadUrl: "string",
						isDownloadOnly: false,
						icon: SeoIcon,
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
					productLogo: SeoIcon,
				},
				{
					id: "bla2",
					productId: "Local SEO",
					startDate: "2017-04-11T00:00:00.000Z",
					endDate: "2017-04-11T00:00:00.000Z",
					reoccurring: true,
					subscriberId: 2,
					slots: {
						amountAvailable: 10,
						amountUsed: 7,
						addMoreSlots: "Add more slots",
					},
					product: {
						id: "productid",
						name: "string",
						description: "string",
						storeUrl: "string",
						downloadUrl: "string",
						isDownloadOnly: false,
						icon: LocalIcon,
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
					productLogo: LocalIcon,
				},
			] }
			onAddMoreSlotsClick={ () => {
				console.log( "add more slots" );
			} }
			onMoreInfoClick={ () => {
				console.log( "more info" );
			} }
			onSettingsClick={ () => {
				console.log( "settings" );
			} }
			onToggleSubscription={ () => {
				console.log( "toggled" );
			} }
		/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
