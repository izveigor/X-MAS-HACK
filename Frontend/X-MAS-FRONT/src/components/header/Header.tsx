import React from "react";
import LogoImg from '../../assets/images/logo.svg';
import {AuthContext} from "../../providers/AuthProvider/AuthProvider";
import {
	HeaderWrapper,
	Logo,
	Logout,
	LogoWrapper,
	UserName,
	UserNameSection,
	UserPanel,
	UserPic
} from "./style";

const Header = () => {
	const {token, logout} = React.useContext(AuthContext);
	return (
		<HeaderWrapper>
			<LogoWrapper>
				<Logo src={LogoImg} alt='logo'/>
			</LogoWrapper>
			{token ? <UserPanel>
				<UserNameSection>
					<UserName>User</UserName>
					<button onClick={logout}><Logout>Выйти</Logout></button>
				</UserNameSection>
				<UserPic/>
			</UserPanel> : null}
		</HeaderWrapper>

	)
}

export default Header
