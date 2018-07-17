import React from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "react-intl";
import styled from "styled-components";

// Components.
import { Button } from "../Button";

// Images.
import icon from "../../images/greeting.png";
import logo from "../../images/my-yoast-academy-logo.svg";

const MainPaper = styled.div`
	padding: 0px;
	width: 480px;
	height: 480px;

    text-align: center;
`;

const Icon = styled.img`
	margin-top: 20px;
	width: 200px;
`;

const Logos = styled.img`
	margin-top: 40px;
	width: 360px;
`;

const Message = styled.p`
	padding: 0 2em;
`;

/**
 * A card representing a message in a login screen,
 * e.g. "Welcome back!", "Password changed".
 *
 * Contains the MyYoast and Yoast Academy logos,
 * an image (defaults to a standard 'greeting' image) and a header.
 *
 * If an onClick handler is given, a button is rendered with the given message,
 * if none is given, the message is rendered as a paragraph.
 *
 * @returns {ReactElement} The component that contains the message
 */
class LoginMessage extends React.Component {

	constructor( props ) {
		super( props );
		this.renderButton = this.renderButton.bind( this );
		this.renderParagraph = this.renderParagraph.bind( this );
	}

	/**
	 * Creates a button with the message as given in the props.
	 * Adds the onClick callback (also given in the props).
	 *
	 * @returns {React.Component} the button, with the onClick callback added.
	 */
	renderButton() {
		return (
			<Button onClick={ this.props.onClick }>
				<FormattedMessage { ...this.props.message } />
			</Button>
		);
	}

	/**
	 * Renders a paragraph with the message given in the props.
	 *
	 * @returns {React.Component} the paragraph, with the message as its contents.
	 */
	renderParagraph() {
		return (
			<Message>
				<FormattedMessage { ...this.props.message } />
			</Message>
		);
	}

	render() {
		return (
			<MainPaper>
				<Logos src={ logo } alt="MyYoast - Yoast Academy" />
				<Icon src={ this.props.image } alt="" />
				<h2>
					<FormattedMessage id={ this.props.header.id }
									  defaultMessage={ this.props.header.defaultMessage } />
				</h2>
				{ this.props.onClick ? this.renderButton() : this.renderParagraph() }
			</MainPaper>
		);
	}
}

LoginMessage.propTypes = {
	image: PropTypes.string,
	header: PropTypes.object,
	message: PropTypes.object,
	onClick: PropTypes.func,
};

LoginMessage.defaultProps = {
	image: icon,
};

export default injectIntl( LoginMessage );
