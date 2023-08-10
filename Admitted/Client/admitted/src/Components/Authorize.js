import React from "react"
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { About } from "./About.js";

export default function Authorize({ setIsLoggedIn }) {

    return (
        <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/about" element={<About />} />
            {!localStorage.getItem("user") ? 
                <Route path="*" element={<Navigate to="/login" />} />
                :
                <></>
                /* <Route path="*" element={<Navigate to="/" />} /> */
            }  
        </Routes>
    );
}