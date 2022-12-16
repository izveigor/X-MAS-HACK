import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  //прибить к низу
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
`

const FooterText = styled.p`
  font-size: 14px;
  color: ${({theme}) => theme.colors.technical};
  text-align: center;
`

export {
	FooterContainer,
	FooterText
}
