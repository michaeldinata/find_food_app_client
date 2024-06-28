import logo from './logo.svg';
import './App.css';
import { api } from './index'
import { Link } from "react-router-dom";
import { Component } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showFoodModalIsOpen: false
    }
  }

  componentDidMount() {
    this.getSession();
  }

  setShowFoodModalState(isOpen) {
    this.setState({ showFoodModalIsOpen: isOpen })
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
                    this.setShowFoodModalState(true)
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
        <Modal
            open={this.state.showFoodModalIsOpen}
            onClose={() => this.setShowFoodModalState(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              test
            </Typography>
            </Box>
          </Modal>
      </div>
    );
  }
}

export default App;
