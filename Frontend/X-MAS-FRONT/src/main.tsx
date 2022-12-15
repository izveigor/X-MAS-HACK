import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import theme from "./themes/theme";
import {ThemeContext} from "styled-components";
import {AuthProvider} from "./providers/AuthProvider/AuthProvider";
import {BrowserRouter} from "react-router-dom";
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter>
      <AuthProvider>
      <ThemeContext.Provider value={theme}>
            <App />
        </ThemeContext.Provider>
      </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
