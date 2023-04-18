import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import CompanyListItem from "../components/CompanyListItem";
import CompanySearchForm from "../components/CompanySearchForm";
import useUser from "../hooks/useUser";
import JoblyApi from "../api";
import "./styles/Companies.css";

const Companies = () => {
    const { user, loading, setUser } = useUser();
    const [companies, setCompanies] = useState([]);
    const [loadingCompanies, setLoadingCompanies] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchCompanies();
    }, []);

    async function fetchCompanies(query = {}) {
        try {
            setLoadingCompanies(true);
            const { companies } = await JoblyApi.getCompanies(query);
            setCompanies(companies);
            setLoadingCompanies(false);
            setError(false);
        } catch (error) {
            setError(true);
            setLoadingCompanies(false);
            setErrorMessage(error[0]);
        }
    }

    if (loading) {
        return <></>;
    }

    if (!user.username) {
        return <Navigate to="/" />;
    }

    return (
        <main className="companies-container">
            <CompanySearchForm onSubmit={fetchCompanies} />
            {loadingCompanies ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error">{errorMessage}</p>
            ) : (
                <>
                    <ul>
                        {companies.map((company, i) => (
                            <CompanyListItem key={i} company={company}></CompanyListItem>
                        ))}
                    </ul>
                </>
            )}
        </main>
    );
};

export default Companies;
