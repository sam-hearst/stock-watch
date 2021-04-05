import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { Redirect, Link } from "react-router-dom";
import * as sessionActions from "../../store/session"
import "./UpForms.css"


const LoginForm = ({ authenticated, setAuthenticated }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = async (e) => {
        e.preventDefault();
        const user = await dispatch(sessionActions.login(email, password));
        if (!user.errors) {
            setAuthenticated(true);
        } else {
            setErrors(user.errors);
        }
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    if (authenticated) {
        return <Redirect to="/" />;
    }

    return (
        <div className="main-up-form-container">
            <img className="upForm-photo" alt="" src="https://cdn.robinhood.com/assets/generated_assets/1e23d6b90f0d905b425ea289de345ab1.jpg" />
            <div className="upForm-container">
                <form onSubmit={onLogin}>
                    <div className="up-form__title">
                        Welcome to tech-watch
                    </div>
                    <div>
                        {errors.map((error) => (
                            <div>{error}</div>
                        ))}
                    </div>
                    <div className="upForm__inputs">
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={updateEmail}
                        />
                    </div>
                    <div className="upForm__inputs">
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={updatePassword}
                        />
                    </div>
                    <div className="upform__other-form">
                        <Link to="/sign-up">
                            <span>Don't have an account? Sign up</span>
                        </Link>
                    </div>
                    <div className="upform__btn">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
