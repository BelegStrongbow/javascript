import styled from "styled-components";

const labelStyleMixin = `
	display: inline-block;
	font-size: 1em;
	margin: 16px 0 8px;
`;

export const StyledLabel = styled.label`
	${ labelStyleMixin }
`;

export const SpanStyledAsLabel = styled.span`
	${ labelStyleMixin }
`;
