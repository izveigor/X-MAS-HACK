import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import {ThemeContext} from "styled-components";
import App from './App'
import './index.css'
import {AuthProvider} from "./providers/AuthProvider/AuthProvider";
import theme from "./themes/theme";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ThemeContext.Provider value={theme}>
					<App/>
				</ThemeContext.Provider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
)
