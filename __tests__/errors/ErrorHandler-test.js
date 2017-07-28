import React from 'react';
import { createComponentWithIntl } from "../../utils";

import ErrorHandler from '../../src/errors/ErrorHandler';

test('the ErrorHandler component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<ErrorHandler errorMessage="This is a test" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the ErrorHandler component with an implemented placeholder matches the snapshot', () => {
	const component = createComponentWithIntl(
		<ErrorHandler errorMessage="This is a test [customer_support_link]" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the ErrorHandler with no Icon requested matches the snapshot', () => {
	const component = createComponentWithIntl(
		<ErrorHandler errorMessage="This is a test [customer_support_link]" showIcon={ false } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});