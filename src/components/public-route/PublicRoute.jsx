// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// class PublicRoute extends React.Component {
//     constructor() {
//         super();
//     }
//
//     render() {
//
//     const themeStyles = 'herhe';
//     const auth = 'eisi';
//     const Component = this.props.component;
//
//         return (
//             <Route
//
//                 render={props =>
//                     auth.isAuthenticated === false ? (
//                         <Component  admin={true} why={'etet'} hellop={themeStyles} {...themeStyles} />
//
//                         // <div>hello
//                         //     <h1>{JSON.stringify(themeStyles)}</h1>
//                         // </div>
//
//                     ) : (
//                         <Redirect to="/dashboard" />
//
//                     )
//                 }
//             />
//         )
//     }
//
// }

//
// const themeStyles = 'rererere'
//
// const PublicRoute = ({ component: Component, auth, behaviours, themeStyles, ...rest }) => (
//     <Route
//         {...rest}
//         render={props =>
//             auth.isAuthenticated === false ? (
//                 <Component  admin={true} why={'etet'} hellop={themeStyles} {...themeStyles} />
//
//                 // <div>hello
//                 //     <h1>{JSON.stringify(themeStyles)}</h1>
//                 // </div>
//
//             ) : (
//                 <Redirect to="/dashboard" />
//
//             )
//         }
//     />
// );
//
// PublicRoute.propTypes = {
//     //auth: PropTypes.object.isRequired
// };
//
// const mapStateToProps = state => ({
//     auth: state.auth,
//     behaviours: state.behaviours,
//     themeStyles: state.themeStyles
// });
//
// export default connect(mapStateToProps)(PublicRoute);



import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect, Provider} from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter } from "react-router-dom";

const PublicRoute = ({ component: Component, auth, behaviours, themeStyles, errors, history, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated === false ? (
                <Component auth={auth} themeStyles={themeStyles} history={history} errors={errors}/>
            ) : (
                <Redirect to="/dashboard" />
            )
        }
    />
);
//
// class PublicRoute extends React.Component {
//
//     componentDidMount(props) {
//         console.log('it did mount')
//         console.log('itttt');
//         console.log(this.props.history);
//       //  props.history.push('/registration-confirmation');
//         //this.props.history.push('/dashboard')
//
//
//     }
//
//
//     render() {
//         const { component: Component, auth, behaviours, themeStyles, history, errors, ...rest } = this.props;
//
//         return (
//             <Component auth={auth} themeStyles={themeStyles} history={history} errors={errors}/>
//         )
//     }
//
// }

PublicRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    behaviours: state.behaviours,
    themeStyles: state.themeStyles
});

export default connect(mapStateToProps)(PublicRoute);
