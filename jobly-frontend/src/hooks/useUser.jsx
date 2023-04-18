// useUser.js
import { useState, useEffect } from "react";
import JoblyApi from "../api";

const useUser = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUserInfo() {
            const userRes = await JoblyApi.getUser();
            if (userRes) {
                setUser(userRes.user);
            }
            setLoading(false);
        }
        getUserInfo();
    }, [loading]);

    return { user, loading, setUser, setLoading };
};

export default useUser;

