import axios from "axios";
import React, { use, useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
    //initialize the hooks
    const[username,setusername] = useState("");
    const[email,setemail] = useState("");
    const[password,setpassword] = useState("");
    const[phone,setphone] = useState("");

    //define the three states
    const[loading, setloading] = useState("");
    const[success, setsuccess] = useState("");
    const[error, seterror] = useState("");

    //Below is a function that willtrigger the sumit function
    const handlesubmit = async(e) => {
        //Below we prevent our site from reloading
        e.preventDefault()

        //Update the load hook with a message that will display while loading
        setloading("Please wait while we put everything ready for you...")

        try{
            //create a form data object that will enable you to capture the four details entered on the four
            const formdata = new FormData();

            //Insert the four details in terms of key-value pairs(username, email, password, phone)
            formdata.append("username", username);
            formdata.append("email",email);
            formdata.append("password", password);
            formdata.append("phone", phone);

            //By use of axios, we can access post
            const response =await axios.post("https://modcom2026a.alwaysdata.net/api/signup",formdata)


            //Just incase everything goes well, update the success hook with a message
            setsuccess(response.data.message);

            setusername("");
            setemail("");
            setphone("");
            setpassword("");

        }
        catch(error){
            //set back the loading to default
            setloading("")

            seterror(error.message)

        }
    }
    return(
        <div className="row justify-content-center mt-4">
            <div className="card col-md-6 shadow p-4">
                <h1 className="text-primary">Sign Up</h1>
                <h3 className="text-seccess">{success}</h3>
                <h1 className="text-danger">{error}</h1>

                <h5 className="text-warning">{loading}</h5>

                <form onSubmit={handlesubmit}>
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
                    <input type="submit" value="signup" className="btn btn-primary" /><br />

                    Already have an account? <Link to={'/signin'}>signin</Link>


                </form>
            </div>
        </div>
    )
}

export default Signup;