import React, { Component } from "react";
import {reactLocalStorage} from 'reactjs-localstorage';
import 'react-toastify/dist/ReactToastify.css';

export default class Status extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pagename:""
		};
    }

    componentDidMount(){
        var url = window.location.href;
        this.setState({pagename:url.substring(url.lastIndexOf('/') + 1)})
    }

    handleLogout(){
        reactLocalStorage.set('userData', "");
        reactLocalStorage.set('is_admin', 0);
        this.props.history.push('/sign-in')
    }


    render() {
        return (
            <form>
                <button type="button" className="btn btn-primary" style={{float:"right"}} onClick={this.handleLogout.bind(this)}>Logout</button>
                <h3>User is {this.state.pagename}</h3>
            </form>
        );
    }
}