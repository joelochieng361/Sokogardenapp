import React, { useState } from "react";
import {link} from "react-router-dom";

const Signup = () => {
    //initialize the hooks
    const[username,setusername] = useState("");
    const[email,setemail] = useState("");
    const[password,setpassword] = useState("");
    const[phone,setphone] = useState("");
    return(
        <div className="row justify-content-center mt-4">
            <div className="card col-md-6 shadow p-4">
                <h1 className="text-primary">Sign Up</h1>

                <form>
                    <input type="text"
                    placeholder="Enter username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    required /> <br />
                    {/* {username} */}

                    <input type="email"
                    placeholder="Enter Email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required /> <br />
                    {/* {email} */}

                    <input type="password"
                    placeholder="Enter password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required /> <br/>
                    {/* {password} */}

                    <input type="number"
                    placeholder="Enter mobile phone number"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    required /> <br/>
                    {/* {phone} */}
                    <input type="button" value="signup" className="btn btn-primary" /><br />

                    Already have an account <link rel="stylesheet" href="" />


                </form>
            </div>
        </div>
    )
}

export default Signup;