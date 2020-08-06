import React from 'react';
import './policyTemplate.scss';
import Logo from '../../assets/images/basketole_logo.png';
import WebFont from 'webfontloader';
import { Link } from "react-router-dom";
import { ReactComponent as Icon } from '../../assets/images/templateicons/cookiespolicyimage.svg';

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Collapse,
} from "reactstrap";

import PublicFooter from './PublicFooter';


WebFont.load({
    google: {
        families: ['Lato:300,400,700', 'Open+Sans:400,600,700', 'sans-serif']
    }
});

class CookiePolicyPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openedCollapses: ['collapseOne'],
        };
    }

    // with this function we create an array with the opened collapses
    // it is like a toggle function for all collapses from this page
    collapsesToggle = collapse => {
        let openedCollapses = this.state.openedCollapses;
        if (openedCollapses.includes(collapse)) {
            this.setState({
                openedCollapses: []
            });
        } else {
            this.setState({
                openedCollapses: [collapse]
            });
        }
    };

    render() {

        const themeAccentColour = '#0693E3';

        return (
            <div className="public-layout">
                <div className="header">
                    <Link to="/">
                        <img alt="logo" src={Logo} />
                    </Link>
                </div>

                <div className="policy-layout__body">
                    <div className="page-heading">
                        <div className="page-heading__icon">
                            <Icon />
                        </div>

                        <h1>Cookie Policy</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ligula ipsum, euismod id ex vel, laoreet sollicitudin risus.</p>
                    </div>

                    <div className="accordions">
                        <div className="accordion">
                            <Card className="card-plain">
                                <CardHeader
                                    role="tab"
                                    onClick={() => this.collapsesToggle("collapseOne")}
                                    aria-expanded={this.state.openedCollapses.includes(
                                        "collapseOne"
                                    )}
                                >
                                    <h5 className="mb-0">Collapsible Group Item #1</h5>
                                </CardHeader>
                                <Collapse
                                    role="tabpanel"
                                    isOpen={this.state.openedCollapses.includes("collapseOne")}
                                >
                                    <CardBody>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life
                                        accusamus terry richardson ad squid. 3 wolf moon officia aute,
                                        non cupidatat skateboard dolor brunch. Food truck quinoa
                                        nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                                        aliqua put a bird on it squid single-origin coffee nulla
                                        assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                                        beer labore wes anderson cred nesciunt sapiente ea proident.
                                        Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you
                                        probably haven't heard of them accusamus labore sustainable
                                        VHS.
                                    </CardBody>
                                </Collapse>
                            </Card>
                            <Card className="card-plain">
                                <CardHeader
                                    role="tab"
                                    onClick={() => this.collapsesToggle("collapseTwo")}
                                    aria-expanded={this.state.openedCollapses.includes(
                                        "collapseTwo"
                                    )}
                                >
                                    <h5 className="mb-0">Collapsible Group Item #2</h5>
                                </CardHeader>
                                <Collapse
                                    role="tabpanel"
                                    isOpen={this.state.openedCollapses.includes("collapseTwo")}
                                >
                                    <CardBody>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life
                                        accusamus terry richardson ad squid. 3 wolf moon officia aute,
                                        non cupidatat skateboard dolor brunch. Food truck quinoa
                                        nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                                        aliqua put a bird on it squid single-origin coffee nulla
                                        assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                                        beer labore wes anderson cred nesciunt sapiente ea proident.
                                        Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you
                                        probably haven't heard of them accusamus labore sustainable
                                        VHS.
                                    </CardBody>
                                </Collapse>
                            </Card>
                            <Card className="card-plain">
                                <CardHeader
                                    role="tab"
                                    onClick={() => this.collapsesToggle("collapseThree")}
                                    aria-expanded={this.state.openedCollapses.includes(
                                        "collapseThree"
                                    )}
                                >
                                    <h5 className="mb-0">Collapsible Group Item #3</h5>
                                </CardHeader>
                                <Collapse
                                    role="tabpanel"
                                    isOpen={this.state.openedCollapses.includes("collapseThree")}
                                >
                                    <CardBody>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life
                                        accusamus terry richardson ad squid. 3 wolf moon officia aute,
                                        non cupidatat skateboard dolor brunch. Food truck quinoa
                                        nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                                        aliqua put a bird on it squid single-origin coffee nulla
                                        assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                                        beer labore wes anderson cred nesciunt sapiente ea proident.
                                        Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you
                                        probably haven't heard of them accusamus labore sustainable
                                        VHS.
                                    </CardBody>
                                </Collapse>
                            </Card>
                        </div>
                    </div>
                </div>

                <div className="protected__footer">
                    <div className="protected__footer__label">
                        <p>&copy; Copyright 2020 The Rubicon Partnership.</p>
                    </div>
                    <div className="public-footer__links">
                        <ul>
                            <li><Link to="/Privacy-Policy" className="nav-link">Privacy Policy</Link></li>
                            <li><Link to="/Cookie-Policy" className="nav-link">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* <PublicFooter themeAccentColour={themeAccentColour} /> */}

            </div>
        )
    }
}

export default CookiePolicyPage;
