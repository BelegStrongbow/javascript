import styled from "styled-components";
import defaults from "../config/defaults.json";
import colors from "yoast-components/style-guide/colors.json";

export const Paper = styled.div`
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
`;

export const WhitePage = styled.div`
	background-color: ${ colors.$color_white };
	padding: 16px 24px;
`;

export const Page = styled( WhitePage )`
	background-color: ${ colors.$color_white };
	display: flex;
	justify-content: space-between;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		display: block;
	}
`;

export const BottomRightButtons = styled.span`
	width: 100%;
	padding-top: 16px;
	display: flex;
	justify-content: flex-end;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		display: block;
	}

	button {
		margin-left: 8px;

		@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
			margin-left: 0;
			margin-top: 8px;
	}
`;
