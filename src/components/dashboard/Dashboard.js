import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './index.css'

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h2>Dashboard</h2>
            </div>
        );
    }
}


export default withRouter(Dashboard);