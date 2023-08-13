import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from '../Managers/UserManager';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar className='header' color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/"><img className="header-image" src={require("../Images/header2.png")} alt="header logo" /></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        { /* When isLoggedIn === true, we will render the Home link */}
                        {isLoggedIn &&
                            <NavItem>
                                <NavLink className='header-link' tag={RRNavLink} to="/">Home</NavLink>
                            </NavItem>
                        }
                    </Nav>
                    <Nav navbar>
                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink className='header-link' tag={RRNavLink} to="/about">About</NavLink>
                                </NavItem>
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
                                    <NavLink style={{color:"black"}} tag={RRNavLink} to="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink style={{color:"black"}} tag={RRNavLink} to="/register">Sign Up</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink style={{color:"black"}} tag={RRNavLink} to="/about">About</NavLink>
                                </NavItem>
                            </>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}