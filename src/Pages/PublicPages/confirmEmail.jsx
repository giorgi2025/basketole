import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PublicPageStyles.scss';
import { confirmPass } from '../../actions/authActions';
import SplitLayout from "../../components/split-layout/SplitLayout";
import SplitLayoutPageHeading from "../../components/split-layout/split-layout-page-heading/SplitLayoutPageHeading";

class ConfirmEmailComplete extends Component {

    constructor(props) {
        super(props);
        // Potentially clear the store here on new user created...
        this.submit = this.submit.bind(this);
    }
    componentWillReceiveProps(nextProps) {

    }
    submit(){
        var url_string = window.location.href;
        var urls = new URL(url_string);
        var c = urls.searchParams.get("token");
        this.props.confirmPass({token:c});
    }
    render() {

        return(
            <SplitLayout
                image={""}
                themeAccentColour={"0693E3"}
            >
                <SplitLayoutPageHeading
                    pageTitle={"Thank you for confirming email"}
                    pageDescription={"Please press confirm to move next."}
                    alignCenter
                >


                    <div className="form__container-form">
                        <div className="form__component form__component--input">
                                <button onClick={this.submit} tabIndex="5" type="submit" className="btn btn-primary btn-large btn-lg btn-block"
                                        style={{backgroundColor: `#0693E3`}}>
                                  confirm
                                </button>
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
    mapStateToProps,{ confirmPass }
) (ConfirmEmailComplete);
