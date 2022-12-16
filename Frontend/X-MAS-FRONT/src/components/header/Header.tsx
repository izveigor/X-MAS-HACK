import React from "react";
import LogoImg from '../../assets/images/logo.svg';
import {
	Logo,
	HeaderWrapper,
	LogoWrapper,
	UserPanel,
	UserPic,
	UserNameSection,
	UserName,
	Logout
} from "./style";
import {AuthContext} from "../../providers/AuthProvider/AuthProvider";
const Header = () => {
	const {token, username, email} = React.useContext(AuthContext);
	  return(
		  <HeaderWrapper>
			  <LogoWrapper>
				  <Logo src={LogoImg} alt="logo" />
				  			  </LogoWrapper>
			  {true ? <UserPanel>
				  <UserNameSection>
					  <UserName>Бродский Иосиф Александрович</UserName>
					  <button><Logout>Выйти</Logout></button>
				  </UserNameSection>
				  <UserPic/>
			  </UserPanel> : null}
			  		  </HeaderWrapper>

	  )
}

export default Header
