import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import JoblyApi from "../api";
import useUser from "../hooks/useUser";
import "./styles/details.css"

const Job = () => {
    const { user, loading, setUser } = useUser();
    const [title, setTitle] = useState("");
    const [salary, setSalary] = useState(null);
    const [equity, setEquity] = useState(null);
    const [company, setCompany] = useState({});
    const [pageLoading, setPageLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isApplied, setIsApplied] = useState(false);
    const { id } = useParams();

    async function applyButton() {
        const res = await JoblyApi.applyToJob(user.username, id);
        
        if(res.applied) {
            setIsApplied(true);
        }
    }

    useEffect(() => {
        async function getJob(id) {
            try {
                const { title, salary, equity, company } = await JoblyApi.getJob(id);
                if("applications" in user) {
                    if(user.applications.indexOf(parseInt(id)) !== -1) {
                        setIsApplied(true);
                    }
                }
                setTitle(title);
                setSalary(salary);
                setEquity(equity);
                setCompany(company);
                setPageLoading(false);
            } catch (e) {
                console.log(e);
                setIsError(true);
                setPageLoading(false);
            }
        }

        getJob(id);
    }, [user]);

    return (
        <main className="job-container">
            {pageLoading || loading ? (
                <p>Loading</p>
            ) : isError ? (
                <p>Error</p>
            ) : (
                <div className="job-details">
                    <h1>{title}</h1>
                    <h3>Company: {company.name}</h3>
                    {salary && <p>Salary: {salary}</p>}
                    {equity && <p>Equity: {equity}</p>}
                    {isApplied ? (
                        <button disabled>
                            Applied
                        </button>
                    ) : (
                        <button onClick={applyButton}>Apply</button>
                    )}
                </div>
            )}
            <Link to="/jobs">{'< Jobs'}</Link>
        </main>
    );
};

export default Job;
