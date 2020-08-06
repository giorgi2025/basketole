import React from 'react';
import './SplitLayoutPageHeading.scss';

class SplitLayoutPageHeading extends React.Component {
    render(props) {
        return (
            <div className={`split-layout__page-heading ${this.props.alignCenter ? 'align--center' : ''}`}>
                <h1 className="split-layout__heading">
                    {this.props.pageTitle}</h1>
                <p>{this.props.pageDescription}</p>
                {this.props.children}
            </div>
        )
    }
}

export default SplitLayoutPageHeading;
