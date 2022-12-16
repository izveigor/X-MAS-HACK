import React, {useEffect} from "react";

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
	const [token, setToken] = React.useState<string | null>(null);
	const [username, setUsername] = React.useState<string | null>(null);

	// useEffect(() => {
	// 	//redirect to login page if token is null
	// 	if (!token && window.location.pathname !== '/login') {
	// 		window.location.href = '/login';
	// 	}
	// 	else {
	// 		localStorage.setItem('token', token || '');
	// 	}
	// }, [token])

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
		// window.location.href = '/login';
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


