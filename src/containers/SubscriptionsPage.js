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
			icon: subscription.product.icon,
			name: subscription.name,
			used: subscription.used,
			limit: subscription.limit,
			nextPayment: new Date( subscription.nextPayment ),
			billingAmount: subscription.price,
			billingCurrency: subscription.currency,
		};

		return subscriptionProps;
	} );

	let query = state.ui.search.query;
	if ( query.length > 0 ) {
		subscriptions = subscriptions.filter( ( subscription ) => {
			return subscription.name.toUpperCase().includes( query.toUpperCase() ) || subscription.limit.toString() === query || subscription.used.toString() === query;
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
