import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, behaviours, themeStyles, errors, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated === true ? (
                <Component auth={auth} themeStyles={themeStyles} errors={errors} />
                // <div>
                //     {/*<h1>{JSON.stringify(themeStyles)}</h1>*/}
                // </div>
            ) : (
                 <Redirect to="/login" />
            )
        }
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    behaviours: state.behaviours,
    themeStyles: state.themeStyles
});

export default connect(mapStateToProps)(PrivateRoute);
