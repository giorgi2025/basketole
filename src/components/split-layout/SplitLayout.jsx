import React from 'react';
import './SplitLayout.scss';

//background-image: url(../../assets/images/split-background-image.jpg);
import SplitLayoutFooter from "../Footer/SplitLayoutFooter/SplitLayoutFooter";
import { Link } from "react-router-dom";


class SplitLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            splitImageUrl: 'http://placehold.it/720x1024'
        }
    }

    componentDidMount() {
    }


    render() {

        return (
            <div className="split-layout">
                <div className="section section--left">
                    <div className="logo__container">
                        <Link to="/" tabIndex="1">
                            <img alt='Logo' className="logoImage" src={require('./basketole-logo2.png')} />
                        </Link>
                    </div>
                        <div className="form__container">
                            {/*{React.cloneElement(this.props.children, { test: 'test'})}*/}
                            {this.props.children}
                            {/*{children}*/}
                        </div>

                    <SplitLayoutFooter themeAccentColour={this.props.themeAccentColour}/>

                </div>

                {/* <div className="section section--right" style={{backgroundImage: 'url("' + require("./login-left-img.png") + '")'}}>

                </div> */}
            </div>
        )
    }
}

export default SplitLayout;
