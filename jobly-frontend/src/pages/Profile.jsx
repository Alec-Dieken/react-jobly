import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import JoblyApi from "../api";
import "./styles/Profile.css";

const Profile = () => {
    const { user, loading, setUser, setLoading } = useUser();
    const [showEditForm, setShowEditForm] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEditButtonClick = () => {
        setShowEditForm(!showEditForm);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setLoading(true)
        // Update user information using an API call
        const updatedUser = await JoblyApi.updateUser({
            firstName,
            lastName,
            email,
            password,
        });
        console.log(updatedUser);
        setUser({...updatedUser, username: user.username, applications: user.applications});
        // Hide the edit form after successful update
        setShowEditForm(false);
        setLoading(false)
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {user && "username" in user ? (
                <div className="profile-container">
                    <h1>{user.username}</h1>
                    <h2>
                        {user.firstName} {user.lastName}
                    </h2>
                    <p>Email: {user.email}</p>
                    <p># of jobs applied to: {user.applications.length}</p>
                    <button onClick={handleEditButtonClick}>{showEditForm ? "Cancel" : "Edit"}</button>

                    {showEditForm && (
                        <form onSubmit={handleFormSubmit} autoComplete="false">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Update</button>
                        </form>
                    )}
                </div>
            ) : (
                <Navigate to="/"></Navigate>
            )}
        </>
    );
};

export default Profile;
