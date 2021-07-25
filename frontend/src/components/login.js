import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import configuration from '../config';
import {reactLocalStorage} from 'reactjs-localstorage';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	fields:{},
			errors:{}
		};
    }

    componentDidMount(){
        reactLocalStorage.set('userData', "");
        reactLocalStorage.set('is_admin', 0);
	}


    handleChange(field, e){
    	let fields = this.state.fields
    	fields[field] = e.target.value;
    	this.setState({fields})
    }

    validation(){
    	let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if(!fields["email"]){
            formIsValid = false;
            errors["email"] = "Please enter email.";
        }
        if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
            	formIsValid = false;
            	errors["email"] = "Please enter valid email address.";
            }
        }
        if(!fields["password"]){
            formIsValid = false;
            errors["password"] = "Please enter password.";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleSubmit(){
        
    	if (this.validation()) {
			let fields = this.state.fields;
            
			fetch(configuration.baseURL+"login", {
					method: "post",
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body:JSON.stringify(this.state.fields)
				}).then((response) => {
					return response.json();
				}).then((data) => {
                    console.log(data);
					if (data.status === 200) {
						let that = this;
						configuration.saveTokenData(data.payload,function(payload){
                            data.payload.is_admin = parseInt(data.payload.is_admin);                            
                            console.log(data.payload.is_admin);
							if(data.payload.is_admin === 1)
							{
								that.props.history.push('/list')
							}
							else if (data.payload.is_admin === 0 && data.payload.status === 'unapproved') {
								that.props.history.push('/unapproved')
							}
							else if(data.payload.is_admin === 0 && data.payload.status === 'approved'){
								that.props.history.push('/approved')
							}
                            else{
                                return toast.error("Something wrong.");
                            }
						});
					}else if(data.status === 404){
						return toast.error("Sorry, This email ID doesn't exist in our records.");
					}else if(data.status === 402){
						return toast.error('Invalid email ID/password combination. Please try again.');
					}
					
			});
    	}
  
    }

    render() {
        return (
            <form>
                <ToastContainer position="top-right" autoClose={5000} style={{top:'80px'}}/>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={this.handleChange.bind(this,'email')} value={this.state.fields.email} />
                    <span style={{color: "red",fontSize:"15px",float:"left"}}>{this.state.errors.email}</span>
                </div>
                <br/>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.handleChange.bind(this,'password')} value={this.state.fields.password}  />
                    <span style={{color: "red",fontSize:"15px",float:"left"}}>{this.state.errors.password}</span>
                </div>
                <br/>

                <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit.bind(this)}>Submit</button>

                <p className="forgot-password text-right">
                    New register <Link to={"/sign-up"}>Sign up</Link>
                </p>
            </form>
        );
    }
}