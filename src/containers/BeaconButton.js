import { connect } from "react-redux";

import { BeaconButton } from "../components/Button";
import { helpBeaconModalOpen } from "../actions/helpBeacon";

export const mapStateToProps = ( state ) => {
	let isOpen = state.ui.helpBeaconModal.modalOpen;

	return {
		isOpen,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		onClick: () => {
			dispatch( helpBeaconModalOpen() );
		},
	};
};

const BeaconButtonContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( BeaconButton );

export default BeaconButtonContainer;
