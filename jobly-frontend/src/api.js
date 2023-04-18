import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
    // the token for interactive with the API will be stored here.
    // static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` };
        const params = method === "get" ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    // REGISTER //
    static async register(username, password, firstName, lastName, email) {
        try {
            const res = await this.request("auth/register", { username, password, firstName, lastName, email }, "post");

            if (res.token) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log("Login error:", e);
            throw e;
        }
    }

    // LOGIN //
    static async login(username, password) {
        try {
            const res = await this.request("auth/token", { username, password }, "post");
            if (res.token) {
                localStorage.setItem("token", JSON.stringify(res.token));
                localStorage.setItem("username", JSON.stringify(username));
            }
        } catch (e) {
            console.log("Login error:", e);
            throw e;
        }
    }

    // LOGOUT //
    static logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
    }

    // GETUSER //
    static async getUser() {
        if (localStorage.getItem("token") && localStorage.getItem("username")) {
            try {
                const res = await this.request(`users/${JSON.parse(localStorage.getItem("username"))}`);
                return res;
            } catch (e) {
                console.log("Error getting User: ", e);
                throw e;
            }
        } else {
            return undefined;
        }
    }

    // UPDATEUSER //
    static async updateUser({ firstName, lastName, email, password }) {
        try {
            const res = await this.getUser();
            const user = res.user;
            console.log(user);
            if ("username" in user) {
                const res = await this.request(`users/${user.username}`, { firstName, lastName, email, password }, "patch");
                console.log(res);
                return res;
            }
        } catch (e) {
            console.log("Error updating User: " + e);
        }
    }

    // GETCOMPANY //
    static async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
    }

    // GETCOMPANIES //
    static async getCompanies({ name = undefined, minEmployees = undefined, maxEmployees = undefined }) {
        let res = await this.request(`companies`, {
            name,
            minEmployees,
            maxEmployees,
            // page: parseInt(page, 10),
            // itemsPerPage: parseInt(itemsPerPage, 10),
        });
        return res;
    }

    // GETJOBS //
    static async getJobs({ title = undefined, minSalary = undefined, hasEquity = false }) {
        let res = await this.request(`jobs`, {
            title,
            minSalary,
            hasEquity,
        });
        return res;
    }

    // GETJOB //
    static async getJob(id) {
        let res = await this.request(`jobs/${id}`);
        return res.job;
    }

    // APPLYTOJOB //
    static async applyToJob(username, id) {
        let res = await this.request(`users/${username}/jobs/${id}`, {}, "POST");
        return res;
    }
}

// // for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
