import styled from "styled-components";

const Logo = styled.img`
	width: 169px;
	height: 30px;
`;

const HeaderWrapper = styled.div`
  	margin-top: 24px;
	display: flex;
	justify-content: space-between;
	align-items: start;
`;

const LogoWrapper = styled.div`
	display: flex;
  	justify-content: start;
  	align-items: center;
`;

const UserPanel = styled.div`
		display: flex;
	  	justify-content: start;
	  	align-items: start;
  		gap: 12px;
`;

const UserPic = styled.div`
width: 45px;
height: 45px;;
background: #9CB5ED;
border-radius: 16px;
`;

const UserNameSection = styled.div`
  text-align: right	;
  gap: 4px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-end;
max-width: 128px;
`;

const UserName = styled.p`
  font-weight: 500;
  font-size: 14px;
	  line-height: 20px;
	  color: ${props => props.theme.colors.primary};
`;

const Logout = styled.p`
	  font-weight: 500;
	  font-size: 14px;
	  line-height: 13px;
	  color: ${props => props.theme.colors.accent};
  	cursor: pointer;
`;







export { Logo, HeaderWrapper, LogoWrapper , UserPanel, UserPic, UserNameSection, UserName, Logout};


