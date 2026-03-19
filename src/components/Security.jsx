import axios from 'axios';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Security = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(""); // This stores the token returned from the server
    const [inputToken, setInputToken] = useState(""); // This is what the user types in the box

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()


    // 1. Function to get the token from the Backend
    const handleGenerateToken = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);

            // Replace with your actual Flask URL
            const response = await axios.post("http://modcom2026a.alwaysdata.net/api/security_protocol", formData);
            
            if (response.data.token) {
                setToken(response.data.token);
                setMessage("Token generated! Copy it into the field below.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to generate token");
        } finally {
            setLoading(false);
        }
    };

    // 2. Function to Submit the "Form" (Add Products logic)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // We use a separate FormData for the actual product details 
            // (In a real app, you'd have product name/price inputs too)
            const productData = new FormData();
            // productData.append("product_name", "..."); 

            const response = await axios.post("http://modcom2026a.alwaysdata.net/api/security_protocol", productData, {
                headers: {
                    // This "infuses" the token into the request header
                    "Authorization": `Bearer ${inputToken}`
                }
            });

            setMessage(response.data.Message || "Success!");
        } catch (err) {
            setError(err.response?.data?.message || "Unauthorized access");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='row justify-content-center mt-4'>
            <div className="col-md-6">
                <h3 className="text-center">Security Protocol</h3>
                <div className="card shadow p-4">
                    {message && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    {token && <div className="alert alert-info">Your Key: <strong>{token}</strong></div>}

                    <form onSubmit={handleSubmit}>
                        <label>Credentials</label>
                        <input type="email"
                            placeholder='Enter email'
                            className='form-control mb-2'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />

                        <input type="password"
                            placeholder='Enter password'
                            className='form-control mb-3'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />

                        <button 
                            type="button" 
                            className='btn btn-outline-danger w-100 mb-4' 
                            onClick={handleGenerateToken}
                            disabled={loading}>
                            {loading ? "Generating..." : "Generate Token"}
                        </button>

                        <label>Access Control</label>
                        <input type="text"
                            placeholder='Paste your token here to unlock'
                            className='form-control mb-3'
                            value={inputToken}
                            onChange={(e) => setInputToken(e.target.value)}
                            required />

                        <input 
                            type="submit" 
                            value={loading ? "Processing..." : "Submit & Access"} 
                            className='btn btn-warning w-100' 
                            disabled={!inputToken}
                            onClick={() => navigate("/addproducts")} />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Security;