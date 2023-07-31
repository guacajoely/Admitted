import React, { useState} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../Managers/UserManager";


export default function Register({setIsLoggedIn}) {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
    } else {
      const userObject = { fullName, email };
      register(userObject, password)
        .then(() => {
          setIsLoggedIn(true)
          navigate('/')
        });
    }
 };

  return (
    <Form onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" type="text" onChange={e => setFullName(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Button>Register</Button>
        </FormGroup>

      </fieldset>
    </Form>
  );
}