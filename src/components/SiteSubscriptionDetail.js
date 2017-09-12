import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { LargeButtonLink, IconButtonTransparent, makeButtonFullWidth } from "./Button";
import Toggle from "./Toggle";
import plusIcon from "../icons/blue-plus-circle.svg";
import { FormattedMessage, injectIntl, intlShape, defineMessages } from "react-intl";
import { RowMobileCollapse, ColumnPrimary, ColumnFixedWidth, makeFullWidth } from "./Tables";
import _partial from "lodash/partial";
import defaults from "../config/defaults.json";
import util from "util";

const messages = defineMessages( {
	toggleAriaLabel: {
		id: "site.subscriptionDetail.toggle",
		defaultMessage: "Enable subscription for: %s",
	},
} );

const SubscriptionLogo = styled.img`
	display: inline-block;
	width: 66px;
	height: 66px;
	vertical-align: middle;
	opacity: ${ props => props.hasSubscriptions ? "1" : "0.2" };

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		display: none;
	}
`;

const SubscriptionToggle = styled.span`
	display: inline-block;
 	visibility: ${ props => props.hasSubscriptions ? "initial" : "hidden" };
	vertical-align: middle;
	margin: 6px 40px 0 2px;

	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		margin-right: 24px;
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		margin-right: 0;
	}
`;

const ProductName = styled.span`
	font-size: 16px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: block;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		white-space: normal;
	}
`;

const SubscriptionUsage = styled.span`
	display: ${ props => props.hasSubscriptions ? "inline-block" : "none" };
	font-weight: 300;
	margin-right: 10px;
`;

let ColumnFixedWidthResponsive = makeFullWidth( ColumnFixedWidth );
let ResponsiveLargeButtonLink = makeButtonFullWidth( LargeButtonLink );

const ColumnFixedWidthEnabled = styled( ColumnFixedWidthResponsive )`
	display: ${ props => props.isEnabled ? "inline-block" : "none" };
`;

/**
 * Creates Site Subscriptions component
 *
 * @param {Object} props The props to use
 *
 * @returns {ReactElement} The rendered component.
 */
function SiteSubscriptionDetail( props ) {
	let rowProps = [];
	if ( props.background ) {
		rowProps.background = props.background;
	}

	let licensesRemaining = props.limit - props.used;

	let anotherLicense = null;
	if ( licensesRemaining === 0 && props.isEnabled === false ) {
		anotherLicense = (
			<IconButtonTransparent iconSource={ plusIcon } iconSize={ "1em" } onClick={ props.onAddMoreSubscriptionsClick } >
				<FormattedMessage
					id="site.subscriptions.licenses.add"
					defaultMessage="Get another subscription"
				/>
			</IconButtonTransparent>
		);
	}

	if ( props.hasSubscriptions === false && props.isAvailable === false ) {
		anotherLicense = (
			<IconButtonTransparent iconSource={ plusIcon } iconSize={ "1em" } onClick={ props.onAddMoreSubscriptionsClick } >
				<FormattedMessage
					id="site.subscriptions.licenses.add"
					defaultMessage="Get a subscription"
				/>
			</IconButtonTransparent>
		);
	}

	let disable = true;
	if ( props.subscriptionId !== "" ) {
		disable = false;
	}
	return (
		<RowMobileCollapse { ...rowProps } hasHeaderLabels={ false }>
			<ColumnFixedWidth>
				<SubscriptionToggle hasSubscriptions={ props.hasSubscriptions }>
					<Toggle
						onSetEnablement={ _partial( props.onToggleSubscription, props.subscriptionId ) }
						onToggleDisabled={ props.onToggleDisabled }
						isEnabled={ props.isEnabled }
						disable={ disable }
						ariaLabel={ util.format( props.intl.formatMessage( messages.toggleAriaLabel ), props.name ) } />
				</SubscriptionToggle>
				<SubscriptionLogo hasSubscriptions={ props.hasSubscriptions} src={ props.icon } alt="" />
			</ColumnFixedWidth>

			<ColumnPrimary>
				<ProductName>{ props.name }</ProductName>
				<SubscriptionUsage hasSubscriptions={ props.hasSubscriptions }>
					<FormattedMessage id="subscriptions.remaining" defaultMessage={"{ howMany } remaining"}
						values={{ howMany: licensesRemaining + "/" + props.limit }} />
				</SubscriptionUsage>
				{ anotherLicense }
			</ColumnPrimary>
			<ColumnFixedWidthEnabled isEnabled={ props.isEnabled}>
				<ResponsiveLargeButtonLink to={ `/account/subscriptions/${ props.subscriptionId }` }>
					<FormattedMessage id="subscriptions.buttons.manage" defaultMessage="Manage" />
				</ResponsiveLargeButtonLink>
			</ColumnFixedWidthEnabled>
		</RowMobileCollapse>
	);
}

SiteSubscriptionDetail.propTypes = {
	subscriptionId: PropTypes.string,
	name: PropTypes.string.isRequired,
	onAddMoreSubscriptionsClick: PropTypes.func,
	onClickToggle: PropTypes.func,
	onToggleSubscription: PropTypes.func,
	onToggleDisabled: PropTypes.func,
	onMoreInfoClick: PropTypes.func.isRequired,
	onShop: PropTypes.string.isRequired,
	isEnabled: PropTypes.bool,
	isAvailable: PropTypes.bool,
	hasSubscriptions: PropTypes.bool,
	icon: PropTypes.string.isRequired,
	limit: PropTypes.number.isRequired,
	used: PropTypes.number.isRequired,
	background: PropTypes.string,
	intl: intlShape.isRequired,
	currency: PropTypes.string,
	popupOpen: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	storeUrl: PropTypes.string.isRequired,
};

SiteSubscriptionDetail.defaultProps = {
	onToggleSubscription: () => {},
	isEnabled: false,
};

export default injectIntl( SiteSubscriptionDetail );
