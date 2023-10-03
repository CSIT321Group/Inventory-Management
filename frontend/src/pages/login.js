import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../components/Hooks/useAxiosPrivate";

export default function Login() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosPrivate.post('http://localhost:8080/api/test/login', {
                userName: username,
                password: password
            });

            if(response.data.token){
                localStorage.setItem('userToken', response.data.token);
                navigate('/');
            }
        } catch (error) {
            console.error(error);
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
                        <Button block size="lg" type="submit" disabled={!validateForm()} onClick={handleSubmit}>
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}