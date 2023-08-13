import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Managers/UserManager";

export default function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login({ email, password })
            .then((user) => {
                if (user) {
                    setIsLoggedIn(true)
                    navigate('/')
                }
                else {
                    alert("Invalid email or password")
                }
            })
    };

    return (
            <Form className="form" onSubmit={loginSubmit}>
            <h2 style={{marginBottom:"2rem"}} className="login-form-title">Login</h2>
                <fieldset>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input className="input sm-text-input" id="email" type="text" onChange={e => setEmail(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input className="input sm-text-input" id="password" type="password" onChange={e => setPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Button className="m-2 purple-button">LOGIN</Button>
                        <Button className="m-2 register-button" tag={Link} to={`/register`} color="secondary">SIGN UP</Button>
                    </FormGroup>
                </fieldset>
            </Form>
   
    );
}