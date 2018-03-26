import React from 'react';
import ImportDataStep from "../../src/components/ImportDataStep";

test('The ImportDataStep component matches the snapshot', () => {
	const component = <ImportDataStep
		importData={ 0 }
		onSubmit={ () => { console.log( "clicked on Continue" ) } }
		onBack={ () => { console.log( "clicked on Back" ); } }
		completeStep={ () => { console.log( "clicked on Continue" ); } } />;

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
