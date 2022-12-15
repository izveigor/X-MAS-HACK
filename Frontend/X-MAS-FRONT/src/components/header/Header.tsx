import React from "react";
import LogoImg from '../../assets/images/logo.svg';
import { Logo, HeaderWrapper, LogoWrapper } from "./style";
import {AuthContext} from "../../providers/AuthProvider/AuthProvider";
const Header = () => {
	const {token, username, email} = React.useContext(AuthContext);
	  return(
		  <HeaderWrapper>
			  <LogoWrapper>
				  <Logo src={LogoImg} alt="logo" />
				  			  </LogoWrapper>
			  {token ? <p>{username}</p> : <p>Not logged in</p>}
			  		  </HeaderWrapper>

	  )
}

export default Header
