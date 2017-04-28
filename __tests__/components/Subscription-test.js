import React from 'react';
import { createComponentWithIntl } from "../../utils";
import { MemoryRouter } from "react-router-dom";
import Subscription from '../../src/components/Subscription';

test('The Subscription component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<Subscription id="a"
		              name="SEO Premium for WordPress"
		              icon="https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png"
		              used={ 14 } limit={ 20 } nextPayment={ new Date( "April 4, 2017" ) }
		              billingAmount={ 12512 }
		              billingCurrency="USD"
		              onManage={ () => {
			              console.log( "clicked on manage button" );
		              } }
		/>
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
