import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Basic column layout.
 */
const ColumnLayout = styled.div`
	display: flex;
`;

/**
 * Main column.
 *
 * Either displayed in the middle when only one child
 * has been provided, or displayed on the left when
 * two have been provided.
 *
 * Is hidden when screen is sufficiently small and two children are provided.
 */
const MainColumn = styled.div`
	width: 480px;
	:not(:only-child) {
		@media screen and ( max-width: 1024px ) {
			display: none;
		}
	}
`;

/**
 * Right-side column.
 *
 * Displayed on the right when at least two children
 * have been provided.
 */
const RightColumn = styled.div`
	margin-left: 48px;
	
	@media screen and ( max-width: 1024px ) {
		margin-left: 0;
	}
`;

/**
 * A one or two column layout for a login / registration / reset password page.
 *
 * First child component is displayed in the left column, second is displayed on the right.
 *
 * Reverts to a one column layout when only one child is given.
 * When more then two child components are given, only the first two are shown.
 *
 * @returns {ReactElement} A two column layout containing the two children as columns.
 */
class LoginColumnLayout extends React.Component {

	/**
	 * Returns the column that should be shown on
	 * the right side of the column layout.
	 * @returns {RightColumn
	 *} the column to display
	 */
	getRightColumn() {
		return <RightColumn>
			{ this.props.children[ 1 ] }
		</RightColumn>;
	}

	/**
	 * Renders the component.
	 * @returns {ColumnLayout} a basic two-column login page layout
	 */
	render() {
		let twoColumns = this.props.children.length > 1;

		return (
			<ColumnLayout>
				<MainColumn>
					{ twoColumns ? this.props.children[ 0 ] : this.props.children }
				</MainColumn>
				{ twoColumns ? this.getRightColumn() : null }
			</ColumnLayout>
		);
	}
}

LoginColumnLayout.propTypes = {
	children: PropTypes.any,
};

export default LoginColumnLayout;

