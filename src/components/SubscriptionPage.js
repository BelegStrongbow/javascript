import PropTypes from "prop-types";
import React from "react";
import AnimatedLoader from "./Loader";
import Header from "./SubscriptionHeader";
import SubscriptionDetails from "./SubscriptionDetails";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { ListHeading } from "./Headings";
import Orders from "./Orders";
import Paper from "./Paper";
import styled from "styled-components";
import defaults from "../config/defaults.json";

const messages = defineMessages( {
	paymentDetailsTitle: {
		id: "subscriptionPage.paymentDetails.title",
		defaultMessage: "Payment details",
	},
	invoicesTitle: {
		id: "subscriptionPage.invoices.title",
		defaultMessage: "Invoices",
	},
} );

/**
 * Changes the default styling of the Orders ListTable.
 *
 * @param {ReactElement} orders The original Orders component.
 * @returns {ReactElement} The Orders component with changed styling.
 */
export function styledOrders( orders ) {
	return styled( orders )`
		li:first-child {
			margin-top: 40px;
		}

		li > span::before {
			top: -20px;
			font-size: 1em;
		}

		@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
			li:first-child {
				margin-top: 0;
			}
		}
	`;
}

let SubscriptionOrders = styledOrders( Orders );

/**
 * Returns the rendered SubscriptionPage component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered SubscriptionPage component.
 */
class SubscriptionPage extends React.Component {
	render() {
		if ( this.props.isLoading ) {
			return <AnimatedLoader />;
		}
		let subscription = this.props.subscription;

		return <section>
			<Header
				name={ subscription.name }
				byline={ subscription.limit + " site subscription" }
				description={ subscription.product.description }
				image={ subscription.product.icon }
			/>
			<Paper>
				<ListHeading>
					{ this.props.intl.formatMessage( messages.paymentDetailsTitle ) }
				</ListHeading>
				<SubscriptionDetails
					startDate={ new Date( subscription.startDate ) }
					nextBilling={ new Date( subscription.nextPayment ) }
					endDate={ new Date( subscription.endDate ) }
					max={ subscription.limit }
					current={ 1 }
					orders={ this.props.orders }
				/>
				<ListHeading>
					{ this.props.intl.formatMessage( messages.invoicesTitle ) }
				</ListHeading>
				<SubscriptionOrders hasPaper={ false } { ...this.props } />
			</Paper>
		</section>;
	}
}

SubscriptionPage.propTypes = {
	isLoading: PropTypes.bool,
	subscription: PropTypes.shape( {
		name: PropTypes.string.isRequired,
		limit: PropTypes.number.isRequired,
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string,
		nextPayment: PropTypes.string,
		product: PropTypes.shape( {
			description: PropTypes.string.isRequired,
			icon: PropTypes.string.isRequired,
		} ),
	} ),
	orders: PropTypes.array,
	intl: intlShape.isRequired,
};

SubscriptionPage.defaultProps = {
	isLoading: false,
	orders: [],
};

export default injectIntl( SubscriptionPage );
