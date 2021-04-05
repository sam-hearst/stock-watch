import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import HomePage from "./components/HomePage"
import StockPage from "./components/StockPage"
import * as sessionActions from "./store/session"
import { authenticate } from "./services/auth";
import { useDispatch } from 'react-redux';

function App() {
    const dispatch = useDispatch();
    const [authenticated, setAuthenticated] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const user = await authenticate();
            if (!user.errors) {
                await dispatch(sessionActions.restore())
                setAuthenticated(true);
            }
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact={true}>
                    <LoginForm
                        authenticated={authenticated}
                        setAuthenticated={setAuthenticated}
                    />
                </Route>
                <Route path="/sign-up" exact={true}>
                    <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
                </Route>
                <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
                    <NavBar setAuthenticated={setAuthenticated} />
                    <UsersList />
                </ProtectedRoute>
                <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
                    <NavBar setAuthenticated={setAuthenticated} />
                    <User />
                </ProtectedRoute>
                <ProtectedRoute path="/stocks/:ticker" exact={true} authenticated={authenticated}>
                    <NavBar setAuthenticated={setAuthenticated} />
                    <StockPage />
                </ProtectedRoute>
                <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
                    <NavBar setAuthenticated={setAuthenticated} />
                    <HomePage />
                </ProtectedRoute>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
