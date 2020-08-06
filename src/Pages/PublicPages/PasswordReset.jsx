import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PublicPageStyles.scss';
import classnames from 'classnames';

import { passwordReset } from '../../actions/authActions';
import SplitLayout from "../../components/split-layout/SplitLayout";
import SplitLayoutPageHeading from "../../components/split-layout/split-layout-page-heading/SplitLayoutPageHeading";
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

class PasswordReset extends Component {

    componentDidMount() {
        // If logged in and user navigates to Login page, we should redirect them to the dashboard
        // if (this.props.auth.isAuthenticated) {
        //     this.props.history.push('/dashboard');
        // }
    }

    constructor(props) {
        super(props);

        this.togglePassword = this.togglePassword.bind(this);
        this.toggleConfirmPassword = this.toggleConfirmPassword.bind(this);
        this.state = {
            active: false,
            passwordVisible: false,
            confirmPasswordVisible: false,
            password:'',
            password2:'',
            frontendErrors: {},
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
        var url_string = window.location.href;
        var urls = new URL(url_string);
        var c = urls.searchParams.get("token");

        let frontendErrors = {};
        if(this.state.password === "") {
            frontendErrors.passwordNull = "Please type password !";
        } else if (this.state.password !== this.state.password2) {
            frontendErrors.passwordMatch = "Confirm Password might be same !";
        } else{
            this.props.passwordReset({newPass:this.state.password,token:c})
        }
        this.setState({
            frontendErrors: frontendErrors
        });

    };


    togglePassword(e) {
        e.preventDefault();
        const currentPasswordState = this.state.passwordVisible;
        this.setState({passwordVisible: !currentPasswordState});
    }

    toggleConfirmPassword(e) {
        e.preventDefault();
        const currentConfirmPasswordState = this.state.confirmPasswordVisible;
        this.setState({confirmPasswordVisible: !currentConfirmPasswordState});
    }

    render() {
        const { errors, frontendErrors } = this.state;

        return(
            <SplitLayout
                image={""}
                themeAccentColour={"0693E3"}
            >
                <SplitLayoutPageHeading
                    pageTitle={"Password Reset"}
                    pageDescription={"Enter your new password below. The password should be at least twelve characters long. To make it stringer, use upper and lower case letters, numbers and symbols like ! \" ? $ % ^ & )."}>


                    <div className="form__container-form">
                        <div className="form__component form__component--input">
                            <Form role="form" onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <div className={classnames('input-field', {
                                        invalid: frontendErrors.passwordNull
                                    })} >
                                        <div className="form-input-header">
                                            <label className="form-control-label"
                                                htmlFor="example4cols1Input">Password
                                            </label>
                                        </div>

                                        <InputGroup className="input-group-merge input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <img src={LockIcon} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                id="password"
                                                onChange={this.onChange}
                                                value={this.state.password}
                                                placeholder="Password"
                                                type={`${this.state.passwordVisible ? 'text' : 'password'}`}
                                                onFocus={() => this.setState({ focusedEmail: true })}
                                                onBlur={() => this.setState({ focusedEmail: false })}
                                            />

                                            <InputGroupAddon addonType="append">
                                                <InputGroupText>
                                                    <button className="btn btn--reveal-password" onClick={this.togglePassword}>
                                                        <Eyecon className={`icon--eyecon icon--eyecon--${ this.state.passwordVisible ? 'visible' : 'hidden'}`} />
                                                    </button>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>

                                        <div className="error-message">
                                            <span>
                                                {frontendErrors.passwordNull}
                                            </span>
                                        </div>
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <div className={classnames('input-field', {
                                        invalid: frontendErrors.passwordMatch
                                    })} >

                                        <div className="form-input-header">
                                            <label className="form-control-label"
                                                htmlFor="example4cols1Input">Confirm Password
                                            </label>
                                        </div>
                
                                        <InputGroup className="input-group-merge input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <img src={LockIcon} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                id="password2"
                                                error={frontendErrors.passwordMatch}
                                                onChange={this.onChange}
                                                value={this.state.password2}
                                                placeholder="Confirm Password"
                                                type={`${this.state.confirmPasswordVisible ? 'text' : 'password'}`}
                                                onFocus={() => this.setState({ focusedEmail: true })}
                                                onBlur={() => this.setState({ focusedEmail: false })}
                                            />

                                            <InputGroupAddon addonType="append">
                                                <InputGroupText>
                                                    <button className="btn btn--reveal-password" onClick={this.toggleConfirmPassword}>
                                                        <Eyecon className={`icon--eyecon icon--eyecon--${ this.state.confirmPasswordVisible ? 'visible' : 'hidden'}`} />
                                                    </button>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        <div className="error-message">
                                            <span>
                                                {frontendErrors.passwordMatch}
                                            </span>
                                        </div>

                                    </div>
                                </FormGroup>


                                <button tabIndex="5" type="submit" className="btn btn-primary btn-large btn-lg btn-block"
                                        style={{backgroundColor: `#0693E3`}}>
                                    Reset Password
                                </button>




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
    { passwordReset }
) (PasswordReset);
