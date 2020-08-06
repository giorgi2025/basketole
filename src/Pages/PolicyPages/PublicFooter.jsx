import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

class PublicFooter extends Component {

    render() {

        const themeAccentColour = '#0693E3'

        return (
            <div className="public-footer">
                <div>
                    <p>&copy; Copyright 2020 The Rubicon Partnership.</p>
                </div>
                <div className="public-footer__links">
                    <ul>
                        <li><Link to="/terms-and-conditions" className="nav-link" style={{color: `#${themeAccentColour}`}}>Terms & Conditions</Link></li>
                        <li><Link to="/privacy-policy" className="nav-link" style={{color: `#${themeAccentColour}`}}>Privacy Policy</Link></li>
                        <li><Link to="/cookie-policy" className="nav-link" style={{color: `#${themeAccentColour}`}}>Cookie Policy</Link></li>
                        <li><Link to="/help-and-support" className="nav-link" style={{color: `#${themeAccentColour}`}}>Help & Support</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default PublicFooter;
