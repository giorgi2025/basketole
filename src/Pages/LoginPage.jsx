import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser,sendConfirmUsername, initializeStatus } from '../actions/authActions';
import classnames from 'classnames';
import SplitLayout from "../components/split-layout/SplitLayout";
import SplitLayoutPageHeading from "../components/split-layout/split-layout-page-heading/SplitLayoutPageHeading";
import LockIcon from '../assets/icons/lock-icon.svg';
import UserIcon from '../assets/icons/user-icon.svg';
import { ReactComponent as Eyecon } from '../assets/icons/eye-icon.svg';
import './globalstuff.scss';

import {
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
} from "reactstrap";

class Login extends Component {

    componentDidMount() {
        // If logged in and user navigates to Login page, we should redirect them to the dashboard
        // if (this.props.auth.isAuthenticated) {
        //     return (<Redirect from="/accounts" to="/users" />)
        // }
        // console.log('390393939393', this.props)
        // console.log('99999999999999999999999999999999', this.props.themeStyles)
    }

    constructor(props) {
        super(props);

        this.togglePassword = this.togglePassword.bind(this);

        this.state = {
            username: '',
            password: '',
            errors: {},
            showPassword: false,
            test: '',
            userIsAuthenticated: false,
            rememberMeActive: false,
            select:"false"
        };

        this.props.initializeStatus();
    }
    componentDidMount(){
        if (localStorage.checkbox === "true") {
            this.setState({
                rememberMeActive: true,
                username: localStorage.username,
                password: localStorage.password,
                select:"true"
            })

        }
        else{
            this.setState({select:false})
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.auth.isAuthenticated) {

            this.setState({
                userIsAuthenticated: true
            });

        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();
        // const { username, password, rememberMeActive } = this.state    
        // if (rememberMeActive && username !== "") {
        //     localStorage.username = username
        //     localStorage.password = password
        //     localStorage.checkbox = rememberMeActive
        //     this.setState({select:true})
        // }

        let errors = {};
        if( this.state.username === "") {
            errors = {
                username: "Please type your name !"
            };

            this.setState({
                errors: errors
            });
            return;
        } else if( this.state.password === "" ) {
            errors = {
                password: "Please type your password !"
            };

            this.setState({
                errors: errors
            });
            return;
        }

        const userData = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.loginUser(userData); // since we handle the redirect within our component, we don't
        // need to pass in this.props.history as a parameter
        
        this.setState({
            errors: {}
        });
    };

    togglePassword = e => {
        e.preventDefault();
        const currentPasswordState = this.state.showPassword;
        this.setState({showPassword: !currentPasswordState});
    };

    toggleRememberMe = e => {
        const currentRememberMeState = this.state.rememberMeActive;
        this.setState({rememberMeActive: !currentRememberMeState})
    };

    continue = () =>{
        this.setState({select:false})
    }
    useAnother = () =>{
        localStorage.username = ""
        localStorage.password = ""
        localStorage.checkbox = false
        this.setState({select:"false",username:"",password:"",rememberMeActive:false})
    }
    sendConfirmUsername =()=>{
        this.props.sendConfirmUsername(this.state.username)
    }
    render() {
        const { errors, rememberMeActive ,select} = this.state;
        const color = 'darkgreen';

        // const themeAccentColour = this.props.themeStyles.themeAccentColour;

        if (this.state.userIsAuthenticated) {
            // return (
            //     <diV>user
            //         <Redirect to="/dashboard" />
            //     </diV>
            // )
        }
            return(
 
                <SplitLayout
                    image={""}
                    themeAccentColour=""
                >
                    {select==="true"? 
                        <SplitLayoutPageHeading pageTitle={"Selection Account"}
                                                pageDescription={"Please select your account"}
                        >     
                                <div className="form__container-form">
                                    <div className="form__component form__component--input">
                                        <button onClick={this.continue} tabIndex="5" type="button" className="btn btn-primary btn-large btn-lg btn-block"
                                                style={{backgroundColor: `#0693E3`}}>{this.state.username}
                                        </button>                      
                                    </div>
                                    <div className="form__component form__component--input">
                                        <button onClick={this.useAnother} tabIndex="5" type="button" className="btn btn-primary btn-large btn-lg btn-block"
                                                style={{backgroundColor: `#0693E3`}}>Use another account
                                        </button>                      
                                    </div>
                                </div>
                        </SplitLayoutPageHeading>
                        :
                        <SplitLayoutPageHeading pageTitle={"Sign-In"}
                                                pageDescription={"Please sign-in to access the Dashboard"}


                        >
                                <div className="form__container-form">
                                    <div className="form__component form__component--input">
                                        <Form role="form" onSubmit={this.onSubmit}>
                                            <FormGroup>
                                                <div className="form-input-header">
                                                    <label className="form-control-label"
                                                        htmlFor="example4cols1Input">User Name
                                                    </label>
                                                    {/* <span className="form-input-link">
                                                        <Link to="/help-and-support" style={{color: `#0693E3`}}>Need help?</Link>
                                                    </span> */}
                                                </div>

                                                <div className={classnames('input-field', {
                                                    invalid: errors.username || errors.usernamenotfound
                                                })} >

                                                <InputGroup className='input-field__group input-group-merge input-group-alternative'>
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <img alt="Username Icon" src={UserIcon} />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        onChange={this.onChange}
                                                        value={this.state.username}
                                                        error={errors.username}
                                                        placeholder="Username"
                                                        type="username"
                                                        id="username"
                                                        onFocus={() => this.setState({ focusedUsername: true })}
                                                        onBlur={() => this.setState({ focusedUsername: false })}
                                                        tabIndex="1"
                                                    />
                                                </InputGroup>

                                                <div className="error-message">
                                                        <span>
                                                            {errors.username}
                                                            {errors.usernamenotfound}
                                                        </span>
                                                </div>

                                                </div>

                                            </FormGroup>

                                            <FormGroup>
                                                <div className="form-input-header">
                                                    <label className="form-control-label"
                                                        htmlFor="example4cols1Input">Password
                                                    </label>
                                                    <span className="form-input-link">
                                                        <Link to="/reset-password" className="nav-link" tabIndex="7" style={{color: `#0693E3`}}>Forgot Password</Link>
                                                    </span>
                                                </div>
                                                <div className={classnames('input-field', {
                                                    invalid: errors.password || errors.passwordincorrect
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
                                                            onFocus={() => this.setState({ focusedUsername: true })}
                                                            onBlur={() => this.setState({ focusedUsername: false })}
                                                            className={classnames('', {
                                                                invalid: errors.password || errors.passwordincorrect
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
                                                            {errors.password}
                                                            {errors.passwordincorrect}
                                                        </span>
                                                    </div>
                                                </div>
                                            </FormGroup>
                                            {
                                                errors.usernamenotverified?
                                                <div className="error-message">
                                                    <span style={{color:"red"}}>                                                        
                                                        {errors.usernamenotverified}
                                                    <br/>
                                                    <Link to={"#"} onClick={this.sendConfirmUsername}  style={{color: `#0693E3`}}>Resend Confirmation Link.</Link>
                                                    </span>
                                                </div>:<></>
                                            }

                                            <button tabIndex="5" type="submit" className="btn btn-primary btn-large btn-lg btn-block"
                                                    style={{backgroundColor: `#0693E3`}}>Sign in
                                            </button>

                                            <div className="signup__after-submit">
                                                <span>New to our platform?</span>
                                                <Link to="/register" className="nav-link" tabIndex="8" style={{color: `#0693E3`}}>Create an account.</Link>
                                            </div>

                                        </Form>
                                    </div>
                                </div>
                        </SplitLayoutPageHeading>


                    }
                    {/*{JSON.stringify(this.props.themeStyles)}*/}
                  
                </SplitLayout>
           
            )

  
    }
}

const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps,
    { loginUser,sendConfirmUsername, initializeStatus }
) (Login);

