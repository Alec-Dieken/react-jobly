import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Companies from "./pages/Companies";
import Company from "./pages/Company";
import Jobs from "./pages/Jobs";
import Job from "./pages/Job";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import JoblyLogo from "./components/JoblyLogo";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <JoblyLogo />
                <Routes>
                    <Route exact path="/" element={<Home />}></Route>
                    <Route exact path="/companies" element={<Companies />}></Route>
                    <Route exact path="/companies/:handle" element={<Company />}></Route>
                    <Route exact path="/jobs" element={<Jobs />}></Route>
                    <Route exact path="/jobs/:id" element={<Job />}></Route>
                    <Route exact path="/profile" element={<Profile />}></Route>
                    <Route exact path="/login" element={<Login />}></Route>
                    <Route exact path="/register" element={<Register />}></Route>
                    <Route path="*" element={<Navigate to="/" />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
