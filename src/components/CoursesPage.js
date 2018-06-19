import React, { Fragment } from "react";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import { speak } from "@wordpress/a11y";
import SubNavigation, { SubNavigationItem } from "./SubNavigation";
import CoursesEnrollments from "../containers/CoursesEnrollments";
import CoursesProgress from "../containers/CoursesProgress";
import PropTypes from "prop-types";


const messages = defineMessages( {
	coursesPageLoaded: {
		id: "menu.courses.loaded",
		defaultMessage: "Courses page loaded",
	},
	underConstruction: {
		id: "courses.underConstruction",
		defaultMessage: "This section is still under construction. To access your courses, please visit:",
	},
} );

let itemRoutes = [
	{
		component: CoursesProgress,
		path: "/courses/progress",
		title: "Courses",
		isActive: ( match, location ) => {
			if ( match ) {
				return match;
			}

			return location.pathname === "/courses" || location.pathname === "/courses/";
		},
	},
	{
		component: CoursesEnrollments,
		path: "/courses/enrollments",
		title: "Enrollments",
	},

];

/**
 * A function that returns the Courses Page component.
 *
 * @returns {ReactElement} The component that contains the courses page.
 */
class CoursesPage extends React.Component {
	/**
	 * Sets the CoursesPage object.
	 *
	 * @returns {void}
	 */
	constructor() {
		super();
	}

	componentDidMount() {
		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.coursesPageLoaded );
		speak( message );
	}

	render() {
		return (
			<Fragment>
				<SubNavigation itemRoutes={ itemRoutes } />
				<SubNavigationItem itemRoutes={ itemRoutes } />
				<SubNavigationItem itemRoutes={ [
					{
						path: "/courses",
						component: CoursesProgress,
					},
				] } />
			</Fragment>
		);
	}
}

export default injectIntl( CoursesPage );

CoursesPage.propTypes = {
	intl: intlShape.isRequired,
	loadCourses: PropTypes.func,
	loadCoursesEnrollments: PropTypes.func,
};
