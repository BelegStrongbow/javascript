import sitesIcon from "../icons/sites.svg";
import userIcon from "../icons/user.svg";
import SitesPageContainer from "../containers/SitesPage";
import AccountPage from "../components/AccountPage";

let menuItems = [
	{
		showInMenu: true,
		path: "/sites",
		titleKey: "sites",
		iconSource: sitesIcon,
		component: SitesPageContainer,
		isActive: ( match, location ) => {
			if ( match ) {
				return true;
			}

			return location.pathname === "/";
		},
	},
	{
		showInMenu: true,
		path: "/account",
		titleKey: "account",
		iconSource: userIcon,
		component: AccountPage,
		exact: false,
	},
];

export default menuItems;
