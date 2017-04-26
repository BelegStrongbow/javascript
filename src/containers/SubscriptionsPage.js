import { connect } from "react-redux";
import { onSearchQueryChange } from "../actions/search";
import SubscriptionsPage from "../components/SubscriptionsPage";
import { push } from "react-router-redux";

export const mapStateToProps = ( state ) => {
	let allIds = state.entities.subscriptions.allIds;

	let subscriptions = allIds.map( ( subscriptionId ) => {
		let subscription = state.entities.subscriptions.byId[ subscriptionId ];

		let subscriptionProps = {
			id: subscription.id,
			name: "Subscription",
			used: 0,
			max: 1,
			nextBilling: new Date(),
			billingAmount: 0,
			billingCurrency: "USD",
			icon: subscription.product.icon,
		};

		return subscriptionProps;
	} );

	let query = state.ui.search.query;
	if ( query.length > 0 ) {
		subscriptions = subscriptions.filter( ( subscription ) => {
			return subscription.name.toUpperCase().includes( query.toUpperCase() ) || subscription.max.toString() === query || subscription.used.toString() === query;
		} );
	}

	return {
		subscriptions,
		query,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		onSearchChange: ( query ) => {
			dispatch( onSearchQueryChange( query ) );
		},
		onManage: ( subscriptionId ) => {
			dispatch( push( "/account/subscriptions/" + subscriptionId ) );
		},
	};
};

const SubscriptionsPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( SubscriptionsPage );

export default SubscriptionsPageContainer;
