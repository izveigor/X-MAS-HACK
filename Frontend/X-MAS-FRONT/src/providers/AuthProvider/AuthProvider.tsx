import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

interface IAuthContext {
	token: string | null;
	username: string | null;
	setToken: (token: string | null) => void;
	setUsername: (username: string | null) => void;
	logout: () => void;
}

const AuthContext = React.createContext<IAuthContext>({
	token: null,
	username: null,
	setToken: () => {
	},
	setUsername: () => {
	},
	logout: () => {
	},
});


const AuthProvider = ({children}: any) => {
	const getFromLocalStorage = () => {
		const token = localStorage.getItem('token');
		return token ? token : null;
	}

	const [token, setToken] = React.useState<string | null>(getFromLocalStorage());
	const [username, setUsername] = React.useState<string | null>(null);
	let navigate = useNavigate();
	useEffect(() => {
		if (token) {
			localStorage.setItem('token', token);
			navigate("/");
		}
		else {
			localStorage.removeItem('token');
		}
	}, [token])


	useEffect(() => {
			const token = localStorage.getItem('token');
			if (token) {
				setToken(token);
			}
		}
		, [])

	const logout = () => {
		setToken(null);
		setUsername(null);
		navigate('/login');
		localStorage.removeItem('token');
	}


	return (
		<AuthContext.Provider value={{token, username, setToken, setUsername, logout}}>
			{children}
		</AuthContext.Provider>
	);
};


export {
	AuthContext,
	AuthProvider
};


