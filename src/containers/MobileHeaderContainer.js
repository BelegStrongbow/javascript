import { logout } from "../actions/user";
import { helpBeaconModalOpen } from "../actions/helpBeacon";
import { connect } from "react-redux";
import MobileHeader from "../components/MobileHeader";

export const mapStateToProps = ( state ) => {
	let pageTitle = "";

	let path = state.router.location.pathname.split( "/" );

	let id = path.pop();
	let type = path.pop();

	// Set page title for sites and subscriptions detail pages.
	if ( type === "sites" && id ) {
		let site = state.entities.sites.byId[ id ];
		pageTitle = site ? site.hostname : "";
	} else if ( type === "subscriptions" && id ) {
		let subscription = state.entities.subscriptions.byId[ id ];
		pageTitle = subscription ? subscription.name : "";
	}

	return {
		pageTitle,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		onBeaconClick: () => {
			dispatch( helpBeaconModalOpen() );
		},
		onLogoutClick: () => {
			dispatch( logout() );
		},
		onBackClick: () => {
			ownProps.history.goBack();
		},
	};
};

const MobileHeaderContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( MobileHeader );

export default MobileHeaderContainer;
