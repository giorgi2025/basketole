import React from 'react';
import './SplitLayoutFooter.scss';
import { Link } from 'react-router-dom';

class SplitLayoutFooter extends React.Component {
    render() {
        return (
            <div className="split-layout-footer">
                <div className="footer__navigation">
                    <ul>
                        <li>
                            <Link to="/cookie-policy" className="nav-link" style={{color: `#${this.props.themeAccentColour}`}}>Cookie Policy</Link>
                        </li>
                        <li>
                            <Link to="/privacy-policy" className="nav-link" style={{color: `#${this.props.themeAccentColour}`}}>Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="/terms-and-conditions" className="nav-link" style={{color: `#${this.props.themeAccentColour}`}}>Terms & Conditions</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer__copyrights">
                    <span className="copyright">&copy; Copyright {new Date().getFullYear()}. All Rights Reserved.</span>
                </div>
            </div>
        )
    }
}

export default SplitLayoutFooter;
