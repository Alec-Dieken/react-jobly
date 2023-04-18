import React from "react";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";
import CardLink from "../components/CardLink";
import JoblyApi from "../api";
import companiesImg from "../images/companies.svg";
import jobsImg from "../images/jobs.svg";
import loginImg from "../images/login.svg";
import registerImg from "../images/register.svg";
import "./styles/Home.css";

const Home = () => {
    const { user, loading, setUser } = useUser();

    function handleLogout() {
        JoblyApi.logout();
        setUser({});
    }

    return (
        <main>
            {loading ? (
                <div className="cardLink-container">
                    <CardLink img="" loc="/" title=""></CardLink>
                    <CardLink img="" loc="/" title=""></CardLink>
                </div>
            ) : "username" in user ? (
                <>
                    <h2>
                        Welcome, <Link to="/profile">{user.username}</Link>!
                    </h2>
                    
                    <div className="cardLink-container">
                        <CardLink img={companiesImg} loc="/companies" title="Companies"></CardLink>
                        <CardLink img={jobsImg} loc="/jobs" title="Job Postings"></CardLink>
                    </div>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <h2>Welcome! Login or Register below</h2>
                    <div className="cardLink-container">
                        <CardLink img={loginImg} loc="/login" title="Login"></CardLink>
                        <CardLink img={registerImg} loc="/register" title="Register"></CardLink>
                    </div>
                </>
            )}
        </main>
    );
};

export default Home;
