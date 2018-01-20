import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            token: '',
        };
    }

    componentWillMount() {
        localStorage.getItem('InshareToken') && this.setState({
            token: JSON.parse(localStorage.getItem('InshareToken')).token,
            isLoggedIn: true,
        });
    }

    render() {
        console.log(this.state);
        return (
            (this.state.isLoggedIn) ? <h1>this is your Dashboard</h1> :
                <Redirect to="/"/>
        );
    }
}

export default Dashboard;
