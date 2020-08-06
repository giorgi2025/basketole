import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {setCurrentUser, logoutUser} from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/private-route/PrivateRoute";
import PublicRoute from "./components/public-route/PublicRoute";

import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/PublicPages/RegisterPage";
import ConfirmedEmail from "./Pages/PublicPages/confirmEmail"
import RegistrationComplete from "./Pages/PublicPages/RegistrationComplete";
import ResetPassword from "./Pages/PublicPages/ResetPassword";
import PasswordReset from "./Pages/PublicPages/PasswordReset";

import Dashboard from './Pages/ProtectedPages/Dashboard';
import Attendee from './Pages/ProtectedPages/Attendee/Attendee';

import CookiePolicyPage from "./Pages/PolicyPages/CookiePolicyPage";
import TermsAndConditionsPage from "./Pages/PolicyPages/TermsAndConditionsPage";
import PrivacyPolicyPage from "./Pages/PolicyPages/PrivacyPolicyPage";
import HelpAndSupportPage from "./Pages/PolicyPages/HelpAndSupportPage";

import './App.css';

import './scss/public-styles/public-styles.scss';
import './scss/Global-Styles/_global-styles.scss';
import './scss/argon-dashboard-pro-react.scss';

import '../src/assets/vendor/nucleo/css/nucleo.css';
import '../src/assets/vendor/nucleo/css/nucleo-svg.css';

// localStorage.removeItem('jwtToken');
// store.dispatch({ type: 'USER_LOGOUT' })
    
// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded))
    // store.dispatch(getUsers());

    // Check for expired token
    const currentTime = Date.now() / 10000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());

        // Redirect to login
        window.location.href = '/login';
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>

                            <PublicRoute exact path="/" component={LoginPage} />
                            <PublicRoute exact path="/login" component={LoginPage} />
                            <PublicRoute exact path="/register" component={RegisterPage} />
                            <PublicRoute exact path="/registration-confirmation" component={RegistrationComplete} />
                            <PublicRoute exact path="/confirm-email" component={ConfirmedEmail} />
                            <PublicRoute exact path="/reset-password" component={ResetPassword} />
                            <PublicRoute exact path="/password-reset" component={PasswordReset} />

                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                            <PrivateRoute exact path="/attendee" component={Attendee} />
                           
                            <PublicRoute exact path="/cookie-policy" component={CookiePolicyPage} />
                            <PublicRoute exact path="/privacy-policy" component={PrivacyPolicyPage} />
                            <PublicRoute exact path="/help-and-support" component={HelpAndSupportPage} />
                            <PublicRoute exact path="/terms-and-conditions" component={TermsAndConditionsPage} />

                    </Switch>

                </Router>
            </Provider>
        )
    }
}

export default App;