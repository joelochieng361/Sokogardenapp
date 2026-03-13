import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//Steps.
//1. Created the user interface =>2 inputs i.e: email, password.
//2. Create the hooks for the two inputs:
	//const [email, setEmail] = useState("");
  	//const [password, setPassword] = useState("");
//3. Test the hooks whether they are working or not. (You bind back the variable on the user interface onChange of any event)
const Signin = () => {
    
    //Define the two hooks for capturing/stalling the users input
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //4. Declare three additional hooks to manage the state of your application: a) loading state b) success state c) Error state.

    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    //Below we have the useNavigate hook to redirect us to another page on successfull signin
    const navigate = useNavigate()

    //Come up with a function that will handle the sumit action
    //Below is a function to handle submit
    const handlesubmit = async (e) => {
        //on handle submit function, prevent site from reloading
        e.preventDefault()

        //Update the loading hook with a message
        setLoading("please wait as we authenticate your profile")

        //create try and catch block
        try{
            //Create a FormData object that will hold object and email
            const formdata = new FormData()

            //10. Insert/append the email and the password on the formData created.
            formdata.append("email", email);
            formdata.append("password", password);

            //11. Interact with axios module that will help you connect to the https protocal as you pass in your URL and the data.
            const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/signin", formdata);

            //set the loading hook back to default
            setLoading("");

            //13. We notice that when a person enters the correct credential i.e email and the password, the details of the user who is trying to login are given back as part of the response from the API. Based on this we can make some decisions by use of the if statement.
            //check weather the user exists as
            if(response.data.user){
                //if user is there , definitely the user is found
                //setSuccess("Login successfull")
                //If it is successfull, let a person be directed to another page
                navigate("/")
                
                //
            }
            else{
                //user is not found, means credentials entered is wrong
                setError("Login failed, please try again....")
            }
        }
        catch(error){
            //set login back to default
            setLoading("")
            //update the error hook with a message
            setError("Oops, something went wrong...")
        }
        //Create a formData object that will hold the email and the password
    }


    return(
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 p-4 card shadow">
                <h1 className="text-primary">Sign in</h1>

                <h5 className="text-info">{loading}</h5>
                <h3 className="text-success">{success}</h3>
                <h4 className="text-danger">{error}</h4>
                <form onSubmit={handlesubmit}>
                    <input type="email"
                    placeholder="Please enter your email"
                    className="form-control"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} /> <br />

                    {/* {email} */}

                    <input type="password"
                    placeholder="Please enter your password"
                    className="form-control"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} /> <br />

                    <input type="submit"
                    value={"Signin"}
                    className="btn btn-primary" />
                </form>
            </div>
        </div>
    )
}

export default Signin;