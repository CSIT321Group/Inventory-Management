import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ onLogin }) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // Create login payload
        const loginDetails = {
            userName: username,
            password: password
        };

        try {
            // Make POST request to login API
            const response = await axios.post("http://localhost:8080/api/test/login", loginDetails);

            // Check if the response status is 200 and if the JWT token is present in the response
            if (response.status === 200 && response.data.token) {
                localStorage.setItem('jwt', response.data.token);
                if (onLogin) {  // invoke the callback
                    onLogin();
                }
                navigate('/');
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            // Handle any errors that occur during the Axios request
            console.error("An error occurred during login:", error);
        }
    }

    return (
        <div className="Login">
            <div className="sub-main">
                <div>
                    <h1>Welcome</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group size="lg" className="form" controlId="username">
                            <Form.Control
                                placeholder="Enter username"
                                autoFocus
                                type="username"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="form" controlId="password">
                            <Form.Control
                                placeholder="Enter password"
                                type="password"
                                value={password}
                                onChange={(p) => setPassword(p.target.value)}
                            />
                        </Form.Group>
                        <div className="link">
                            <Link to="/forgot-password" className="link">
                                Forgot Password?
                            </Link>
                        </div>
                        <Button block size="lg" type="submit" disabled={!validateForm()}>
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}