import { useState } from "react"
import "./assets/styles.css"
import "bootstrap/dist/css/bootstrap.css"
import { Submit } from "./helpers"
import { APIlink } from "../../App"
import { Link, redirect } from "react-router-dom";

export function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (event, password, email) => {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.set('Authorization', 'Basic ' + encodeURI(email + ":" + password));
        
        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: 'follow'
        }

        let response;

        try{
            response = await fetch (`${APIlink}/login`, requestOptions)
        } catch(err) {
            console.log(err)
            setError(err);
            return;
        }

        console.log(response)
        const result = await response.text();
        const json = JSON.parse(result);

        if(response.status === 200) {
            setError(null);
            localStorage.setItem('isAuthenticated', true);
        } else {
            setError(json.error)
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
                <input className="form-control form-control-lg"
                type="text"
                id="password"
                value={password}
                placeholder="password"
                onChange={(event) => {
                    setError("")
                    setPassword(event.target.value)}}/>
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
                    console.log(password)
                    console.log(event)
                    event.preventDefault();
                    if(email != "" && password != "") {
                        handleSubmit(event, password, email);
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