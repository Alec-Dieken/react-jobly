import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import JoblyApi from "../api";
import "./styles/authform.css";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await JoblyApi.login(username, password);
            navigate("/");
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <form className="authform" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
            <Link to="/register">Register</Link>
        </form>
    );
};

export default Login;
