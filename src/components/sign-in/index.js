import { useState } from "react"
import "./assets/styles.css"
import "bootstrap/dist/css/bootstrap.css"
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input'
import { Submit } from "./helpers"
import { Link, redirect } from "react-router-dom";
import { api } from '../../index'

export function SignIn() {
    const [email, setEmail] = useState("")
    const [pwValues, setPwValues] = useState({
        password: "",
        showPassword: false
    })
    const [error, setError] = useState(null)

    const handleClickShowPassword = () => {
        setPwValues({
            ...pwValues,
            showPassword: !pwValues.showPassword
        })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handlePasswordChange = (prop) => (event) => {
        setPwValues({
            ...pwValues,
            [prop]: event.target.value
        })
    }

    const handleSubmit = async (event, password, email) => {
        event.preventDefault();

        let response;

        response = api.post('login/', {
            "email": email,
            "password": password
        }, {
            headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": localStorage.getItem('csrf')
            },
            withCredentials: true
        }).then(res => {
            const isLogin = res.data['login']
            if (isLogin) localStorage.setItem('isAuthenticated', true);
        }, error => {
            console.log(error)
        })
        

        if(response.status === 200) {
            setError(null);
            localStorage.setItem('isAuthenticated', true);
        } else {
            setError(null)
        }
    }

    return (
        <div className="register">
        <div className="row justify-content-center align-items-center">
            <div className="w-50 p-3">
            <Link to="/"> &lt; back to home</Link>
            <h1>Log in</h1>
            <Link to="/signup">or create a new account</Link>
            <br></br>
            <br></br>

            <form>
                <div className="input-group mb-3">
                <input className="form-control form-control-lg"
                type="text"
                id="email"
                value={email}
                placeholder="email address"
                onChange={(event) => {
                    setError("")
                    setEmail(event.target.value)}}/>
                </div>

                <small style={{ color: "red", height: "10px", display: "inline-block"}}>
                    {error == "user not found" ? "Account doesn't exist" : ""}
                </small>

                <div className="input-group mb-3">
                <Input className="form-control form-control-lg"
                type= {pwValues.showPassword ? "text" : "password"}
                id="password"
                value={pwValues.password}
                placeholder="password"
                onChange={handlePasswordChange("password")}
                disableUnderline={true}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={
                                handleClickShowPassword
                            }
                            onMouseDown={
                                handleMouseDownPassword
                            }
                        >
                            {pwValues.showPassword ? (
                                <VisibilityIcon />
                            ) : (
                                <VisibilityOffIcon />
                            )}
                        </IconButton>
                    </InputAdornment>
                }
                />
                </div>

                <small style={{ color: "red", height: "10px", display: "inline-block"}}>
                    {error == "incorrect password"
                    ? "Incorrect Password"
                    : error == "Username and Password can't be empty"
                    ? error
                    : ""}
                </small>

                <button className="button"
                    onClick={(event) => {
                    console.log(email)
                    console.log(pwValues.password)
                    console.log(event)
                    event.preventDefault();
                    if(email != "" && pwValues.password != "") {
                        handleSubmit(event, pwValues.password, email);
                    } else {
                        setError("Email and Password cannot be empty!")
                    }
                    console.log(error)
                }}>
                    {" "}
                    Log In
                </button>

            </form>
            </div>
        </div>
        </div>
    )
}