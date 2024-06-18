import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import axios from 'axios'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SignIn } from './components/sign-in'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<App/>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/signup" element={<SignIn/>} />
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

let APIlink = 'https://127.0.0.1:8000/findfood/api/v1'
let defaultTimeout = 30000

axios.defaults.xsrfHeaderName = 'x-csrftoken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.withCredentials = true
axios.defaults.baseURL = APIlink
axios.defaults.timeout = defaultTimeout

export const api = axios.create()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
