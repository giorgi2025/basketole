import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PublicPageStyles.scss';

import SplitLayout from "../../components/split-layout/SplitLayout";
import SplitLayoutPageHeading from "../../components/split-layout/split-layout-page-heading/SplitLayoutPageHeading";

class RegistrationComplete extends Component {

    componentDidMount() {
        // Potentially clear the store here on new user created...
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {

        return(
            <SplitLayout
                image={""}
                themeAccentColour={"0693E3"}
            >
                <SplitLayoutPageHeading
                    pageTitle={"Thank you for registering"}
                    pageDescription={"Please confirm your email address to login."}
                    alignCenter
                >


                    <div className="form__container-form">
                        <div className="form__component form__component--input">

                        </div>
                    </div>
                </SplitLayoutPageHeading>
            </SplitLayout>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(
    mapStateToProps
) (RegistrationComplete);
