import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import Lending from './components/Lending/Lending'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
      <Routes>
        <Route
          path="/"
          element={<App />}
        />
        <Route
          path="/lending"
          element={<Lending />}
        />
      </Routes>
    </Router>,
  // <React.StrictMode>
  //   <App />
  //   <Lending />
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
