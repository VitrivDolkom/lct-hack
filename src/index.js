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
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<AuthProvider><App /></AuthProvider>}>
      </Route>
    </Routes>
  </BrowserRouter >
);

