import { connect } from "react-redux";
import _groupBy from "lodash/groupBy";
import _sortBy from "lodash/fp/sortBy";
import _reverse from "lodash/reverse";
import _flow from "lodash/flow";

import { retrieveCoursesEnrollments, retrieveCourses } from "../actions/courses";
import CoursesProgress from "../components/CoursesProgress";
import { getUserId } from "../functions/auth";
import { getShopUrl } from "../functions/products";

export const mapStateToProps = ( state ) => {
	const currentUserId = getUserId();

	let coursesEnrollments = state.entities.coursesEnrollments.allIds
		.map( ( enrollmentId ) => {
			return state.entities.coursesEnrollments.byId[ enrollmentId ];
		} )
		.filter( ( enrollment ) => enrollment.status !== "refunded" );

	coursesEnrollments = _groupBy( coursesEnrollments, "courseId" );

	let courses = state.entities.courses.allIds
		.map( ( courseId ) => {
			let course = state.entities.courses.byId[ courseId ];
			let enrollments = coursesEnrollments[ courseId ] || [];
			let studentEnrollment = enrollments
				.find( ( enrollment ) => enrollment.studentId === currentUserId ) || ( { progress: 0, isTrial: false } );
			let usedEnrollments = enrollments
				.filter( ( enrollment ) => enrollment.studentId );
			let availableEnrollment = enrollments
				.find( ( enrollment ) => {
					return enrollment.buyerId && ( ! enrollment.studentId || enrollment.progress === 0 );
				} );
			let usProduct = course.products ? course.products.find( ( product ) => product.sourceShopId === 1 ) : null;
			let shopUrl = usProduct ? `${getShopUrl()}/?yst-add-to-cart=${usProduct.sourceId}` : "";

			return {
				image: course.iconUrl,
				title: course.name,
				description: course.description,

				progress: studentEnrollment.progress,
				isTrial: studentEnrollment.isTrial,
				trialCompleted: studentEnrollment.trialCompleted,

				totalEnrollments: enrollments.length,
				usedEnrollments: usedEnrollments.length,
				availableEnrollment,

				shopUrl,
				certificateUrl: course.certificateUrl,
				courseUrl: course.courseUrl,

				isFree: course.open,
				isEnrolled: ! ! studentEnrollment,
				isCompleted: studentEnrollment ? studentEnrollment.progress === 100 : false,
				deprecated: course.deprecated,

				isOnSale: course.sale,
				saleLabel: course.saleLabel,

				hasTrial: course.hasTrial,
			};
		} )
		// Only show courses in which you are enrolled, are free or have a shop url and aren't deprecated.
		.filter( ( course ) => course.isEnrolled || course.isFree || ( ! course.deprecated && course.shopUrl ) );

	// Sort to show sales first, then enrolled courses, then free courses and then the rest. Within groups sort on progress.
	// Reverse is needed because boolean sort weird.
	courses = _flow(
		_sortBy( [ "progress", "totalEnrollments" ] ),
		_sortBy( [ "isEnrolled", "isFree", "hasTrial" ] ),
		_reverse,
		_sortBy( "isCompleted" ),
		_reverse,
		_sortBy( "isOnSale" ),
		_reverse,
		_sortBy( "deprecated" )
	)( courses );

	return { courses };
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		loadData: () => {
			dispatch( retrieveCourses() );
			dispatch( retrieveCoursesEnrollments() );
		},
	};
};

const CoursesProgressContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( CoursesProgress );

export default CoursesProgressContainer;
