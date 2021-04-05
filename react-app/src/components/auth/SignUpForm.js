import React, { useState } from "react";
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../services/auth';
import "./UpForms.css"

const SignUpForm = ({ authenticated, setAuthenticated }) => {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const user = await signUp(first_name, last_name, email, password);
            if (!user.errors) {
                setAuthenticated(true);
            }
        }
    };

    const updateFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const updateLastName = (e) => {
        setLastName(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    if (authenticated) {
        return <Redirect to="/" />;
    }

    return (
        <div className="main-up-form-container">
            <img className="upForm-photo" alt="" src="https://cdn.robinhood.com/assets/generated_assets/1e23d6b90f0d905b425ea289de345ab1.jpg" />
            <div className="upForm-container">
                <form onSubmit={onSignUp}>
                    <div className="up-form__title">
                        Sign-up for tech-watch
                    </div>
                    <div className="upForm__inputs">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="username"
                            onChange={updateFirstName}
                            value={first_name}
                        ></input>
                    </div>
                    <div className="upForm__inputs">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="username"
                            onChange={updateLastName}
                            value={last_name}
                        ></input>
                    </div>
                    <div className="upForm__inputs">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            onChange={updateEmail}
                            value={email}
                        ></input>
                    </div>
                    <div className="upForm__inputs">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={updatePassword}
                            value={password}
                        ></input>
                    </div>
                    <div className="upForm__inputs">
                        <label>Repeat Password</label>
                        <input
                            type="password"
                            name="repeat_password"
                            onChange={updateRepeatPassword}
                            value={repeatPassword}
                            required={true}
                        ></input>
                    </div>
                    <div className="upform__other-form">
                        <Link to="/login">
                            <span>Already have an account? Login</span>
                        </Link>
                    </div>
                    <div className="upform__btn">
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;
