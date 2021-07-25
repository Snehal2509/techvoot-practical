import React, { Component } from "react";
import configuration from '../config';
import {reactLocalStorage} from 'reactjs-localstorage';

export default class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[]
		};
    }

    componentDidMount(){
        reactLocalStorage.get('userData');
        if(reactLocalStorage.get('is_admin') === 1 || reactLocalStorage.get('is_admin') === "1"){
            fetch(configuration.baseURL+"users_list").then((response) => {
                return response.json();
            }).then((data) => {
                this.setState({ data: data.payload});
            });
        }
        else{
            this.props.history.push('/sign-in')
        }
	}

    handleAction(type, user_id) {
        
		fetch(configuration.baseURL+"update_user", {
			method: "post",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({user_id:user_id, status:type})
		}).then((response) => {
			return response.json();
		}).then((data) => {
			this.componentDidMount();
		});
	}

    handleLogout(){
        reactLocalStorage.set('userData', "");
        reactLocalStorage.set('is_admin', 0);
        this.props.history.push('/sign-in')
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary" style={{float:"right"}} onClick={this.handleLogout.bind(this)}>Logout</button>
                <h3>User List</h3>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">First name</th>
                        <th scope="col">Last name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Gender</th>
                        <th scope="col">City</th>
                        <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
				        this.state.data.map((e, key) => {
                        return <tr>
                            <td scope="row">#{e.id}</td>
                            <td>{e.firstname}</td>
                            <td>{e.lastname}</td>
                            <td>{e.email}</td>
                            <td>{e.gender}</td>
                            <td>{e.city.title || ''}</td>
                            <td> {	e.status==='unapproved' ?
                                <button onClick={this.handleAction.bind(this, 'approved',e.id)} className="btn btn-danger"  > Unapproved </button>
                                : 
                                <button onClick={this.handleAction.bind(this, 'unapproved',e.id)} className="btn btn-success" > Approved </button>
                                }</td>
                        </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}