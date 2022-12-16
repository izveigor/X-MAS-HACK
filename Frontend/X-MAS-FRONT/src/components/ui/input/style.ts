import styled from "styled-components";

const InputWrapper = styled.div`
	  display: flex;
	  flex-direction: column;
  		width: 100%;
  gap: 2px;
	  `;
const InputLabel = styled.label`
			  font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 17px;
  color: ${props => props.theme.colors.primary};
  `;

const StyledInput = styled.input`
	  width: 100%;
  	  height: 40px;
  		font-size: 16px;
  	font-weight: 500;
  	padding: 0 10px;
  	  border: 2px solid ${props => props.theme.colors.accent};
  background: ${props => props.theme.colors.easy};
  	  border-radius: 8px;
  box-sizing: border-box;
`

const ErrorBlock = styled.div`
			 font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 17px;
	  color: ${props => props.theme.colors.wait};
	  height: 17px;
	  `;

export { InputWrapper, InputLabel, StyledInput, ErrorBlock };

