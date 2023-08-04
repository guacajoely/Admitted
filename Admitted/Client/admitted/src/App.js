import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Header";
import ApplicationViews from "./Components/AppViews";
import { useEffect } from 'react';
import Authorize from './Components/Authorize';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setIsLoggedIn(true)
        }
    }, [isLoggedIn])

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            {!isLoggedIn ?
                <Authorize setIsLoggedIn={setIsLoggedIn} />
                :
                <ApplicationViews />
            }
        </Router>
    );
}

export default App;