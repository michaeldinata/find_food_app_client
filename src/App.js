import logo from './logo.svg';
import './App.css';
import { api } from './index'
import { Link } from "react-router-dom";
import { Component } from 'react';


class App extends Component {
  componentDidMount() {
    this.getSession();
  }

  getCSRF() {
    api.get("csrf/", {
      withCredentials: true
    }).then((response) => {
      console.log('response here: ' + response.headers)
      let csrftoken = response.headers.get("x-csrftoken")
      localStorage.setItem('csrf', csrftoken);
      console.log('csrftoken here: ' + csrftoken)
    }).catch((error) => {
      console.log(error)
    })
  }

  getSession() {
    api.get("session/", {
      withCredentials: true
    })
    .then((response) => {
      const data = response.data
      console.log(data)
      if(data.isAuthenticated) {
        localStorage.setItem('isAuthenticated', true);
      } else {
        localStorage.setItem('isAuthenticated', false);
        this.getCSRF()
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  handleFindFood(pos) {
    let response;

    response = api.post('findmefood/', {
      "position": pos,
    }, {
      headers: {
        'Content-Type': 'application/json',
        "X-CSRFToken": localStorage.getItem('csrf')
        },
      withCredentials: true
    }).then(res => {
      console.log(res)
    }, error => {
        console.log(error)
    })
  }

  render() {
    return (
      <div className="App">
        <div className="login-btn" >
          <Link to="/signin" className="btn btn-primary">Log in</Link>
          <div className="divider"/>
          <Link to="/signup" className="btn btn-secondary">Sign up</Link> 
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button className='button'
            onClick={(event) => {
              event.preventDefault();
              if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const pos = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                    };

                    this.handleFindFood(pos)
                  },
                  () => {
                    console.log("browser doesn't support geolocation")
                  }
                )
              }
            }}>
            Find Food For Me!
          </button>
        </header>
      </div>
    );
  }
}

export default App;
