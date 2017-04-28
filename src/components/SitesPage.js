import util from "util";
import React from "react";
import styled from "styled-components";
import a11ySpeak from "a11y-speak";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import AddSiteModal from "./AddSiteModal";
import Sites from "./Sites";
import Search from "./Search";
import NoSites from "./NoSites";
import SitesNoResult from "./SitesNoResult";
import { RoundAddButton } from "./RoundButton";
import AnimatedLoader from "./Loader";

const messages = defineMessages( {
	sitesPageLoaded: {
		id: "menu.sites.loaded",
		defaultMessage: "Sites page loaded",
	},
	searchResults: {
		id: "sites-search.results",
		defaultMessage: "Number of sites found: %d",
	},
	searchLabel: {
		id: "search.label.sites",
		defaultMessage: "Search sites",
	},
} );

const SiteAddContainer = styled.div`
	text-align: center;
	button {
		margin: 20px 0 36px 0;
	}
`;

/**
 * Returns the rendered Sites Page component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Sites component.
 */
class SitesPage extends React.Component {
	/**
	 * Sets the SitesPage object.
	 *
	 * Used just to set the searchTimer, no need to pass props.
	 *
	 * @returns {void}
	 */
	constructor() {
		super();

		this.debounceSearchResultsMessage = this.debounceSearchResultsMessage.bind( this );

		this.searchTimer = false;
	}

	/**
	 * Return the search bar.
	 *
	 * @returns {ReactElement} The rendered Search component.
	 */
	getSearch() {
		return <Search
			id="search"
			searchLabel={ this.props.intl.formatMessage( messages.searchLabel ) }
			descriptionId="search-description"
			onChange={ this.props.onSearchChange }
			query={ this.props.query }
		/>;
	}

	componentDidMount() {
		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.sitesPageLoaded );
		a11ySpeak( message );
	}

	render() {
		let props = this.props;
		if ( props.showLoader ) {
			return <AnimatedLoader />;
		}

		let modal = (
			<AddSiteModal isOpen={ props.popupOpen } onLink={ props.onLink } onClose={ props.onClose }
						  onChange={ props.onChange } errorFound={ props.errorFound }
						  errorMessage={ props.errorMessage } query={ props.query } />
		);
		if ( props.sites.length > 0 ) {
			return (
				<div>
					<SiteAddContainer>
						{ this.getSearch() }
						<RoundAddButton onClick={ props.addSite }/>
					</SiteAddContainer>
					<Sites sites={ props.sites } onManage={ props.onManage }/>
					{ modal }
				</div>
			);
		} else if ( props.query.length > 0 ) {
			return (
				<div>
					<SiteAddContainer>
						{ this.getSearch() }
					</SiteAddContainer>
					<SitesNoResult onClick={ props.addSite } query={ props.query } />
					{ modal }
				</div>
			);
		}
		return (
			<div>
				<NoSites onClick={ props.addSite }/>
				{ modal }
			</div>
		);
	}

	componentWillReceiveProps( nextProps ) {
		/*
		 * While typing or pasting in the search field, `componentWillReceiveProps()`
		 * continously passes a new `query` props. We use this at our advantage
		 * to debounce the call to `a11ySpeak()`.
		 * Note: remember for <input> and <textarea>, React `onChange` behaves
		 * like the DOM's built-in oninput event handler.
		 */
		this.debounceSearchResultsMessage( nextProps );
	}

	/**
	 * Debounces `a11ySpeak()` and announces the search results to screen readers.
	 *
	 * @param {Object} nextProps The new props received by the component.
	 *
	 * @returns {void}
	 */
	debounceSearchResultsMessage( nextProps ) {
		/*
		 * Always clear any previously set timeout and then set it again. This
		 * is equivalent to debouncing the call to `a11ySpeak()`.
		 */
		window.clearTimeout( this.searchTimer );

		/*
		 * Only if the search query is not empty. Also, check if the query is
		 * different from the previous one: this ensures `a11ySpeak()` is not
		 * called when the component re-renders for other reasons, for example
		 * when opening the Add Site modal.
		 */
		if ( nextProps.query.length > 0 && ( this.props.query !== nextProps.query ) ) {
			let message = util.format( this.props.intl.formatMessage( messages.searchResults ), nextProps.sites.length );

			this.searchTimer = window.setTimeout( function() {
				a11ySpeak( message, "assertive" );
			}, 1000 );
		}
	}
}

export default injectIntl( SitesPage );

SitesPage.propTypes = {
	sites: React.PropTypes.arrayOf( React.PropTypes.object ),
	addSite: React.PropTypes.func.isRequired,
	onSearchChange: React.PropTypes.func.isRequired,
	popupOpen: React.PropTypes.bool,
	onLink: React.PropTypes.func.isRequired,
	onClose: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
	onManage: React.PropTypes.func.isRequired,
	errorFound: React.PropTypes.bool.isRequired,
	errorMessage: React.PropTypes.string,
	intl: intlShape.isRequired,
	query: React.PropTypes.string,
	showLoader: React.PropTypes.bool,
};

SitesPage.defaultProps = {
	sites: [],
	popupOpen: false,
	errorMessage: "",
	showLoader: false,
};
