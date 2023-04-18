import React from "react";
import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import JoblyApi from "../api";
import "./styles/Companies.css";

const Company = () => {
    const {user, loading, setUser} = useUser();
    const [name, setName] = useState("");
    const [numEmployees, setNumEmployees] = useState(null);
    const [description, setDescription] = useState(null);
    const [jobs, setJobs] = useState(null);
    const [companyLoading, setCompanyLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const { handle } = useParams();

    useEffect(() => {
        async function getCompany(handle) {
            try {
                const { name, numEmployees, description, jobs } = await JoblyApi.getCompany(handle);
                setName(name);
                setNumEmployees(numEmployees);
                setDescription(description);
                setCompanyLoading(false);
                setJobs(jobs);
            } catch (e) {
                console.log(e);
                setIsError(true);
                setCompanyLoading(false);
            }
        }
        getCompany(handle);
    }, [handle]);

    if(loading) {
        return <p>Loading...</p>
    }

    if(!user.username) {
        return <Navigate to="/"></Navigate>
    }
console.log(jobs);
    return (
        <main className="company-container">
            {companyLoading ? (
                <p>Loading</p>
            ) : isError ? (
                <p>Error</p>
            ) : (
                <div className="job-details">
                    <h1>{name}</h1>
                    <h3>{description}</h3>
                    <p>Num Employees: {numEmployees}</p>
                    <p>Jobs:</p>
                    <ul>
                        {jobs.map((job) => <li key={job.id}><Link to={`/jobs/${job.id}`}>{job.title}</Link></li>)}
                    </ul>
                </div>
            )}
            <Link to="/companies">{'< Companies'}</Link>
        </main>
    );
};

export default Company;
