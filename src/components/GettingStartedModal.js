import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import GettingStarted from "../components/GettingStarted";

const messages = defineMessages( {
	modalAriaLabel: {
		id: "modal.arialabel.getting-started",
		defaultMessage: "Getting started",
	},
} );

/*
 * Makes the `aria-hidden="true"` attribute being applied on the root element
 * instead of the body.
 */
Modal.setAppElement( "#root" );

class BaseGettingStartedModal extends React.Component {

	constructor( props ) {
		super( props );
	}

	/**
	 * Returns the rendered html.
	 *
	 * @returns {ReactElement} The rendered html.
	 */
	render() {
		return (
			<div>
				<Modal
					isOpen={ this.props.isOpen }
					onRequestClose={ this.props.onClose }
					role="dialog"
					contentLabel={ this.props.intl.formatMessage( messages.modalAriaLabel ) }
					overlayClassName={ `${ this.props.className } my-yoast-modal__overlay` }
					className={ `${ this.props.className } my-yoast-modal__content` }
				>
					<GettingStarted
						onClose={ this.props.onClose }
					/>
				</Modal>
			</div>
		);
	}
}

BaseGettingStartedModal.propTypes = {
	className: React.PropTypes.string,
	intl: intlShape.isRequired,
	isOpen: React.PropTypes.bool,
	onClose: React.PropTypes.func.isRequired,
};

BaseGettingStartedModal.defaultProps = {
	isOpen: false,
};

const GettingStartedModal = styled( BaseGettingStartedModal )`
	&.my-yoast-modal__overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
		transition: background 100ms ease-out;
	}

	@media screen and (max-width: 1024px) {
		&.my-yoast-modal__overlay {
			bottom: 74px;
		}
	}

	&.my-yoast-modal__content {
		position: absolute;
		top: 50%;
		left: 50%;
		right: auto;
		bottom: auto;
		width: auto;
		max-width: 90%;
		max-height: 90%;
		border: 0;
		border-radius: 0;
		margin-right: -50%;
		padding: 8px 24px 24px;
		transform: translate(-50%, -50%);
		background-color: #fff;
		outline: none;
		
		@media screen and ( max-width: 500px ) {
			overflow-y: auto;
		}
		
		@media screen and ( max-height: 640px ) {
			overflow-y: auto;
		}
	}

	.my-yoast-modal__actions {
		padding-top: 1em;
		text-align: right;
	}

	.my-yoast-modal__actions button {
		margin-left: 1em;
	}
`;

export default injectIntl( GettingStartedModal );
