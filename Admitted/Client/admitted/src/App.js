import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Header";
import ApplicationViews from "./Components/AppViews";
import { useEffect } from 'react';
import Authorize from './Components/Authorize';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);


    useEffect(() => {
        if (!localStorage.getItem("user")) {
            setIsLoggedIn(false)
        }
    }, [isLoggedIn])

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            {isLoggedIn ?
                <ApplicationViews />
                :
                <Authorize setIsLoggedIn={setIsLoggedIn} />
            }
        </Router>
    );
}

export default App;