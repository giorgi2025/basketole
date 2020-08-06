import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Validator from 'validator';
import isEmpty from 'is-empty';
import './PublicPageStyles.scss';


import { forgotPassword } from '../../actions/authActions';
import classnames from 'classnames';
import SplitLayout from "../../components/split-layout/SplitLayout";
import SplitLayoutPageHeading from "../../components/split-layout/split-layout-page-heading/SplitLayoutPageHeading";

import EmailIcon from '../../assets/icons/email-icon.svg';

import {
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
} from "reactstrap";

class ResetPassword extends Component {

    componentDidMount() {
        // If logged in and user navigates to Login page, we should redirect them to the dashboard
        // if (this.props.auth.isAuthenticated) {
        //     this.props.history.push('/dashboard');
        // }
    }

    constructor() {
        super();

        this.state = {
            email: '',
            errors: {},
            frontendErrors: {},
            status:false
        };
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.errors) {
        //     this.setState({
        //         errors: nextProps.errors
        //     })
        // }
        //
        // if (nextProps.auth.newUserCreated) {
        //     this.props.history.push('/registration-confirmation');
        // }
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };


    onSubmit = e => {
        e.preventDefault();
        let frontendErrors = {};
        if (isEmpty(this.state.email)) {
            frontendErrors.emailIsNull = "Email address is required";
            
            this.setState({
                frontendErrors: frontendErrors
            });
        } else if (!Validator.isEmail(this.state.email)) {
            frontendErrors.emailIsInvalid = "Email address is invalid";

            this.setState({
                frontendErrors: frontendErrors
            });
        } //else if (this.authorisedDomain(this.state.email)) {
        //     frontendErrors.emailDomainIsUnauthorised = 'Unathorised Domain'
        // }
        else{
            this.props.forgotPassword(this.state.email)
            this.setState({status:true, frontendErrors: {}})
        }

    };

    authorisedDomain(email) {
        if (!email.includes('digitalcodemediasolutions') && !email.includes('digitalcodemedia')) {
            return true;
        }
    }

    render() {
        const { errors, frontendErrors } = this.state;

        const themeAccentColour = "0693E3";

        return(
            <SplitLayout
                image={""}
                themeAccentColour={"0693E3"}
            >
                <SplitLayoutPageHeading
                    pageTitle={"Reset Password"}
                    pageDescription={"If you have forgotten your password, we can email instructions to reset your password."}>


                    <div className="form__container-form">
                        <div className="form__component form__component--input">
                            <Form role="form" onSubmit={this.onSubmit}>


                                <FormGroup>

                                    <div className="form-input-header">
                                        <label className="form-control-label"
                                               htmlFor="example4cols1Input">Email
                                        </label>
                                        {/* <span className="form-input-link">
                                            <a tabIndex="6"><Link to="/help-and-support" style={{color: `#${themeAccentColour}`}}>Need help?</Link></a>
                                        </span> */}
                                    </div>

                                    <div className={classnames('input-field', {
                                        invalid: frontendErrors.emailIsNull || frontendErrors.emailIsInvalid || frontendErrors.emailDomainIsUnauthorised || errors.userExists
                                    })} >

                                        <InputGroup className='input-field__group input-group-merge input-group-alternative'>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <img alt="Email Icon" src={EmailIcon} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                onChange={this.onChange}
                                                value={this.state.email}
                                                // error={errors.email}
                                                placeholder="Email"
                                                type="email"
                                                id="email"
                                                onFocus={() => this.setState({ focusedEmail: true })}
                                                onBlur={() => this.setState({ focusedEmail: false })}
                                                tabIndex="1"
                                            />
                                        </InputGroup>

                                        <div className="error-message">
                                                <span>
                                                    {errors.userExists}
                                                    {frontendErrors.emailIsNull}
                                                    {frontendErrors.emailIsInvalid}
                                                    {frontendErrors.emailDomainIsUnauthorised}
                                                </span>
                                        </div>
                                    </div>

                                </FormGroup>

                                <button tabIndex="5" type="submit" className="btn btn-primary btn-large btn-lg btn-block"
                                        style={{backgroundColor: `#0693E3`}}>
                                   {this.state.status?"Please check your email":"Reset Password"}
                                </button>

                                <div className="signup__after-submit">
                                    <Link to="/login" className="nav-link" tabIndex="8" style={{color: `#${themeAccentColour}`}}>Return to login</Link>
                                </div>

                            </Form>
                        </div>
                    </div>
                </SplitLayoutPageHeading>
            </SplitLayout>
        )
    }
}

// registerUser.propTypes = {
//     registerUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
//     errors: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { forgotPassword }
) (ResetPassword);
