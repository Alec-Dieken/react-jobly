import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import JoblyApi from "../api";
import "./styles/authform.css";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await JoblyApi.register(username, password, firstName, lastName, email);
            console.log("SUCCESS??: " + success);
            if(success) {
                navigate("/login");
            } else {
                setIsError(true);
            }
            
        } catch (error) {
            // Handle login error, e.g., show an error message
            console.error("Register error:", error);
        }
    };
    return (
        <form className="authform" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <button type="submit">Register</button>
            <Link to="/login">Login</Link>
        </form>
    );
};

export default Register;
