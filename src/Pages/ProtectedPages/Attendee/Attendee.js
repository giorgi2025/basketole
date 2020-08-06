import React, { Component, Fragment} from 'react'
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Attendee extends Component {
    constructor() {
        super();

        this.state = {
            myData: [],
        }

    }

    componentWillMount() {
        this.createTableData();
    }

    createTableData() {
        let tempData = [];
        // let no = 1;
        this.props.attendee.map(eachAttendee => {
            let item = {};
            item = {
                id: eachAttendee.id,
                name: eachAttendee.name,
                mobile: eachAttendee.mobile,
                session: eachAttendee.session,
                date: eachAttendee.date,
                storeConsent: eachAttendee.storeConsent,
                badgeHolder: eachAttendee.badgeHolder,
            }
            tempData.push(item)
        })
        this.setState({
            myData: tempData
        })
    }

    render() {

        const columns = [
            {  
                accessor: 'id', 
                Header: 'ID',  
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
            },
            {  
                accessor: 'name', 
                Header: 'Name',  
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
            },
            {  
                accessor: 'mobile', 
                Header: 'Mobile',  
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
            },
            {  
                accessor: 'session', 
                Header: 'Session',  
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
            },
            {  
                accessor: 'date', 
                Header: 'Date',  
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
            },
            {  
                accessor: 'storeConsent', 
                Header: 'Store Consent',  
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
            },
            {  
                accessor: 'badgeHolder', 
                Header: 'Badge Holder',  
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
            },

        ]  

        return (
            <Fragment>
                {/* <!-- Container-fluid starts--> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h2>Attendee List</h2>
                                </div>
                                <div className="card-body">
                                    <div id="basicScenario" className="attendTable">
                                        <ReactTable  
                                            data={this.state.myData}  
                                            columns={columns}  
                                            defaultPageSize = {10}  
                                            pageSizeOptions = {[5, 10, 20, 30, 40, 50, 100]}  
                                            pagination={true}
                                            class="-striped -highlight" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Container-fluid Ends--> */}
            </Fragment>

        )
    }
}

const mapStateToProps = state => ({
    attendee: state.attendee.attendee,
})

export default connect(
    mapStateToProps,
    {}
)(Attendee);
