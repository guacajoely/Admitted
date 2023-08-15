import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Header";
import ApplicationViews from "./Components/AppViews";
import { useEffect } from 'react';
import Authorize from './Components/Authorize';
import SubHeader from './Components/SubHeader.js';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [inactiveAdmissions, setInactiveAdmissions] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setIsLoggedIn(true)
        }
    }, [isLoggedIn])

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} inactiveAdmissions={inactiveAdmissions} setInactiveAdmissions={setInactiveAdmissions}/>
            {!isLoggedIn ?
                <Authorize setIsLoggedIn={setIsLoggedIn} />
                :
                <ApplicationViews setInactiveAdmissions={setInactiveAdmissions}/>
            }
        </Router>
    );
}

export default App;