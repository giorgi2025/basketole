import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Validator from 'validator';
import isEmpty from 'is-empty';
import './PublicPageStyles.scss';

import { registerUser, initializeStatus } from '../../actions/authActions';
import classnames from 'classnames';
import SplitLayout from "../../components/split-layout/SplitLayout";
import SplitLayoutPageHeading from "../../components/split-layout/split-layout-page-heading/SplitLayoutPageHeading";
import { Redirect, Route, Switch } from "react-router";
import UserIcon from '../../assets/icons/user-icon.svg';
import JobTitleIcon from '../../assets/icons/job-icon.svg';
import EmailIcon from '../../assets/icons/email-icon.svg';
import LockIcon from '../../assets/icons/lock-icon.svg';

import { ReactComponent as Eyecon } from '../../assets/icons/eye-icon.svg';

import {
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
} from "reactstrap";
import {css} from "emotion";

//const history = useHistory();

class RegisterPage extends Component {

    componentDidMount() {
        // If logged in and user navigates to Login page, we should redirect them to the dashboard
        // if (this.props.auth.isAuthenticated) {
        //    // this.props.history.push('/dashboard');
        // }
    }

    constructor(props) {
        super(props);

        this.togglePassword = this.togglePassword.bind(this);

        this.state = {
            username: '',
            businessName: '',
            email: '',
            password: '',
            password2: '',
            errors: {},
            frontendErrors: {},
            showPassword: false,
            showPassword2: false,
            policy: false
        };

        this.props.initializeStatus();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }

        if (nextProps.auth.newUserCreated) {
            // this.props.history.push('/registration-confirmation');
            window.location = '/registration-confirmation';
        }
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();

        // Let's check the frontend Validation
        let frontendErrors = {};

        if (isEmpty(this.state.username)) {
            frontendErrors.username = 'User Name is Required';
        }

        if (isEmpty(this.state.businessName)) {
            frontendErrors.businessName = 'Job Title is Required';
        }


        if (isEmpty(this.state.email)) {
            frontendErrors.emailIsNull = "Email address is required";
        } else if (!Validator.isEmail(this.state.email)) {
            frontendErrors.emailIsInvalid = "Email address is invalid";
        } 
        // else if (this.authorisedDomain(this.state.email)) {
        //     frontendErrors.emailDomainIsUnauthorised = 'Unathorised Domain'
        // }


        if (Validator.isEmpty(this.state.password)){
            frontendErrors.passwordIsNull = "Password is required";
        } else if (!Validator.isLength(this.state.password, {min: 6, max: 30})){
            frontendErrors.passwordLength = 'Password must be between 6 and 30 characters'
        }

        if (!Validator.equals(this.state.password, this.state.password2)){
            frontendErrors.passwordsMatch = 'Passwords must match'
        }

        // if (!this.state.policy) {
        //     frontendErrors.policyIsFalse = 'Please accept the policies';
        // }

        this.setState({
            frontendErrors: frontendErrors
        });
        const newUser = {
            username: this.state.username,
            businessName: this.state.businessName,
            email: this.state.email,
            password: this.state.password,
        };


        if (isEmpty(frontendErrors)) {
            this.props.registerUser(newUser);
            // window.location = '/registration-confirmation'
        }
    };

    togglePassword = e => {
        e.preventDefault();
        const currentPasswordState = this.state.showPassword;
        this.setState({showPassword: !currentPasswordState});
    };

    togglePassword2 = e => {
        e.preventDefault();
        const currentPasswordState = this.state.showPassword2;
        this.setState({showPassword2: !currentPasswordState});
    };

    togglePolicy = () => {
        const currentPolicyState = this.state.policy;
        this.setState({policy: !currentPolicyState})
    }

    authorisedDomain(email) {
        return false
        // if (!email.includes('digitalcodemediasolutions') && !email.includes('digitalcodemedia')) {
        //     return true;
        // }
    }

    render() {
        const { errors, frontendErrors, policy } = this.state;

        const themeAccentColour = "0693E3";

        return(
            <SplitLayout
                image={""}
                themeAccentColour={"0693E3"}
            >
                <SplitLayoutPageHeading pageTitle={"Register"} pageDescription={"Create a new account"}>


                    <div className="form__container-form">
                        <div className="form__component form__component--input">
                            
                            <Form role="form" onSubmit={this.onSubmit}>
                                
                                <FormGroup>
                                    <div className={classnames('input-field', {
                                        invalid: errors.unknownError
                                    })} >
                                        <div className="error-message">
                                            <span>
                                                {errors.unknownError}
                                            </span>
                                        </div>
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <div className={classnames('input-field', {
                                        invalid: frontendErrors.username || errors.userExistsWithUsername
                                    })} >

                                        <InputGroup className='input-field__group input-group-merge input-group-alternative'>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <img alt="User Icon" src={UserIcon} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                onChange={this.onChange}
                                                value={this.state.username}
                                                error={frontendErrors.username}
                                                placeholder="User Name"
                                                type="text"
                                                id="username"
                                                onFocus={() => this.setState({ focusedEmail: true })}
                                                onBlur={() => this.setState({ focusedEmail: false })}
                                                tabIndex="1"
                                            />
                                        </InputGroup>

                                        <div className="error-message">
                                            <span>
                                                {errors.userExistsWithUsername}
                                                {frontendErrors.username}
                                            </span>
                                        </div>

                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <div className={classnames('input-field', {
                                        invalid: frontendErrors.businessName
                                    })} >

                                        <InputGroup className='input-field__group input-group-merge input-group-alternative'>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <img alt="Job Title Icon" src={JobTitleIcon} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                onChange={this.onChange}
                                                value={this.state.businessName}
                                                error={frontendErrors.businessName}
                                                placeholder="Business Name"
                                                type="text"
                                                id="businessName"
                                                tabIndex="1"
                                            />
                                        </InputGroup>

                                        <div className="error-message">
                                            <span>
                                                {frontendErrors.businessName}
                                            </span>
                                        </div>

                                    </div>
                                </FormGroup>

                                <FormGroup>

                                    <div className={classnames('input-field', {
                                        invalid: frontendErrors.emailIsNull || frontendErrors.emailIsInvalid || frontendErrors.emailDomainIsUnauthorised || errors.userExistsWithEmail
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
                                                    {errors.userExistsWithEmail}
                                                    {frontendErrors.emailIsNull}
                                                    {frontendErrors.emailIsInvalid}
                                                    {frontendErrors.emailDomainIsUnauthorised}
                                                </span>
                                        </div>
                                    </div>

                                </FormGroup>

                                <FormGroup>
                                    <div className={classnames('input-field', {
                                        invalid: frontendErrors.passwordIsNull || frontendErrors.passwordLength
                                    })} >
                                        <InputGroup className="input-field__group input-group-merge input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <img alt="Password Icon" src={LockIcon} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                onChange={this.onChange}
                                                value={this.state.password}
                                                error={errors.password}
                                                id="password"
                                                type={`${this.state.showPassword ? 'text' : 'password'}`}
                                                placeholder="Password"
                                                onFocus={() => this.setState({ focusedEmail: true })}
                                                onBlur={() => this.setState({ focusedEmail: false })}
                                                className={classnames('', {
                                                    invalid: frontendErrors.passwordIsNull || frontendErrors.passwordLength
                                                })}
                                                tabIndex="2"
                                            />

                                            <InputGroupAddon addonType="append">
                                                <InputGroupText>
                                                    <button tabIndex="3" className="btn btn--reveal-password" onClick={this.togglePassword} type="button">
                                                        <Eyecon className={`icon--eyecon icon--eyecon--${ this.state.showPassword ? 'visible' : 'hidden'}`} />
                                                    </button>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>

                                        <div className="error-message">
                                            <span>
                                                {frontendErrors.passwordIsNull}
                                                {frontendErrors.passwordLength}
                                            </span>
                                        </div>
                                    </div>
                                </FormGroup>


                                <FormGroup>
                                    <div className={classnames('input-field', {
                                        invalid: frontendErrors.passwordsMatch
                                    })} >
                                        <InputGroup className="input-field__group input-group-merge input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <img alt="Password Icon" src={LockIcon} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                onChange={this.onChange}
                                                value={this.state.password2}
                                                id="password2"
                                                type={`${this.state.showPassword2 ? 'text' : 'password'}`}
                                                placeholder="Confirm Password"
                                                onFocus={() => this.setState({ focusedEmail: true })}
                                                onBlur={() => this.setState({ focusedEmail: false })}
                                                className={classnames('', {
                                                    invalid: frontendErrors.passwordsMatch
                                                })}
                                                tabIndex="2"
                                            />

                                            <InputGroupAddon addonType="append">
                                                <InputGroupText>
                                                    <button tabIndex="3" className="btn btn--reveal-password" onClick={this.togglePassword2} type="button">
                                                        <Eyecon className={`icon--eyecon icon--eyecon--${ this.state.showPassword2 ? 'visible' : 'hidden'}`} />
                                                    </button>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>

                                        <div className="error-message">
                                                <span>
                                                    {frontendErrors.passwordsMatch}
                                                </span>
                                        </div>
                                    </div>
                                </FormGroup>

                                {/* <div className="custom-control custom-checkbox mb-3"
                                     onClick={() => this.togglePolicy()}>
                                    <input
                                        className="custom-control-input"
                                        id="customCheck1"
                                        type="checkbox"
                                        tabIndex="4"
                                    />
                                    <label
                                        className={'custom-control-label-cb ' + css([
                                            {
                                                '&:before': {
                                                    backgroundColor: 'transparent',
                                                    borderColor: `#${themeAccentColour}`,
                                                    // '&:hover':{
                                                    //     color
                                                    // }
                                                }

                                            },
                                            policy && {
                                                '&:before': {
                                                    backgroundColor: `#${themeAccentColour}`,
                                                    borderColor: `#${themeAccentColour}`,
                                                    // '&:hover':{
                                                    //     color
                                                    // }
                                                }
                                            }
                                        ])}
                                    >
                                        Remember me
                                    </label>
                                </div> */}

                                <button tabIndex="5" type="submit" className="btn btn-primary btn-large btn-lg btn-block"
                                        style={{backgroundColor: `#0693E3`}}>
                                    Register
                                </button>
                                <div className="signup__after-submit">
                                    <span>Already have an account?</span>
                                    <Link to="/login" className="nav-link" tabIndex="8" style={{color: `#0693E3`}}>Log in</Link>
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
    // auth: state.auth,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { registerUser, initializeStatus }
) (RegisterPage);
