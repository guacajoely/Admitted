import React, { useEffect, useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from '../Managers/UserManager';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { checkIfInactiveAdmissions } from '../Managers/AdmissionManager.js';

export default function Header({ isLoggedIn, setIsLoggedIn, inactiveAdmissions, setInactiveAdmissions}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    let localUser = []
    let UserObject = []

    if (isLoggedIn === true) {
        localUser = localStorage.getItem("user");
        UserObject = JSON.parse(localUser);
    }

    useEffect(() => {
        if(UserObject.id){
        checkIfInactiveAdmissions(UserObject.id)
            .then((bool) => setInactiveAdmissions(bool));
        }
    }, [UserObject.id, setInactiveAdmissions])


    return (
        <div>
            <Navbar className='header' color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/"><img className="header-image" src={require("../Images/header2.png")} alt="header logo" /></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>

                    <Nav className="mr-auto" navbar>
                    </Nav>

                    <Nav className='main-links' navbar>
                        {isLoggedIn &&
                            <>

                                <NavItem>
                                    <NavLink className='header-link' tag={RRNavLink} to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='header-link' tag={RRNavLink} to="/about">About</NavLink>
                                </NavItem>



                                {UserObject.id ? 

                                <>
                                
                                {inactiveAdmissions ?
                                    <NavItem>
                                        <NavLink className='header-link' tag={RRNavLink} to={`/history/${UserObject.id}`}>History</NavLink>
                                    </NavItem>
                                    :
                                    <></>
                                }

                                </>

                                :

                                <></>

                                }

                                <NavItem>
                                    <NavLink className='header-link' tag={RRNavLink} onClick={() => {
                                        logout()
                                        setIsLoggedIn(false)
                                    }}>Logout</NavLink>
                                </NavItem>
                            </>
                        }
                        {!isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink className='header-link' tag={RRNavLink} to="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='header-link' tag={RRNavLink} to="/register">Sign Up</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='header-link' tag={RRNavLink} to="/about">About</NavLink>
                                </NavItem>
                            </>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}