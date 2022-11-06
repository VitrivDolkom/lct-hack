import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from './App';
import { AuthProvider } from './context/autho';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider><App /></AuthProvider>
);

