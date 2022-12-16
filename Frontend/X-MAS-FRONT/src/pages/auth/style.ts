import styled from "styled-components";

const FormWrapper = styled.div`
  	margin-inline: auto;
	  display: flex;
	  flex-direction: column;
  		max-width: 256px;
	  align-items: center;
	  justify-content: center;
  	  margin-top: 10%;
	  width: 100%;
	  height: 100%;
  	  position: relative;
	 `

const Form = styled.form`
  margin-top: 44px;
  gap: 6px;
  	display: flex;
  	  flex-direction: column;
  	  align-items: center;
  	  justify-content: center;
  	  width: 100%;
  	  height: 100%;
  `


const FormTitle = styled.h3`
	  	font-style: normal;
	  	font-weight: 500;
	  	font-size: 24px;
	  	color: ${(props) => props.theme.colors.main};
	  	`

const Accent = styled.li`
color: ${(props) => props.theme.colors.accent};
text-decoration: underline;
cursor: pointer;
  
  
`

export { FormWrapper, Form, FormTitle, Accent }
