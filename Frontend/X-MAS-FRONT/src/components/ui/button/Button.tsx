import styled from "styled-components";

interface IButtonProps {
	main: boolean;
}

const Button = styled.button<IButtonProps>`
	display: flex;
  	font-style: normal;
  	font-weight: 600;
  	font-size: 15px;
	flex-direction: row;
	align-items: flex-start;
	padding: 11px 27px;
  	border-radius: 24px;
  	background-color: ${(props) => (props.main ? props.theme.colors.accent : props.theme.colors.support)};
  	color: ${(props) => (props.main ? props.theme.colors.background : props.theme.colors.accent)};
  	cursor: pointer;
`

export default Button;
