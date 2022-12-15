import React from "react";

interface IAuthContext {
	token: string | null;
	username: string | null;
	email: string | null;
}

const AuthContext = React.createContext<IAuthContext>({
	token: null,
	username: null,
	email: null,
});



const AuthProvider = ({children}: any) => {
	const [token, setToken] = React.useState<string | null>(null);
	const [username, setUsername] = React.useState<string | null>(null);
	const [email, setEmail] = React.useState<string | null>(null);

	return  (
		<AuthContext.Provider value={{ token, username, email }}>
			{children}
		</AuthContext.Provider>
	);
};


export { AuthContext, AuthProvider };


