import React, { useState, useEffect } from "react";
import JobListItem from "../components/JobListItem";
import JoblyApi from "../api";
import JobSearchForm from "../components/JobSearchForm";
import "./styles/Companies.css";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    async function fetchJobs(query = {}) {
        try {
            setLoadingJobs(true);
            const { jobs } = await JoblyApi.getJobs(query);
            setJobs(jobs);
            setLoadingJobs(false);
        } catch (error) {
          console.log("ERROR")
        }
    }

    return (
        <main className="jobs-container">
            <JobSearchForm onSubmit={fetchJobs}></JobSearchForm>
            {loadingJobs ? (
                <p>Loading</p>
            ) : (
                <>
                    <ul>
                        {jobs.map((job, i) => (
                            <JobListItem key={i} job={job}></JobListItem>
                        ))}
                    </ul>
                </>
            )}
        </main>
    );
};

export default Jobs;
