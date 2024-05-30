import logo from './logo.svg';
import './App.css';
import { Link } from "react-router-dom";

export const APIlink = 'http://127.0.0.1:8000/findfood'

function App() {
  return (
    <div className="App">
      <div className="login-btn" >
        <Link to="/signin" className="btn btn-primary">Log in</Link>
        <div className="divider"/>
        <Link to="/signup" className="btn btn-secondary">Sign up</Link> 
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Find Food For Me!
        </a>
      </header>
    </div>
  );
}

export default App;
