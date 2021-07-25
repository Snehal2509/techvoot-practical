import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import configuration from '../config';
import {reactLocalStorage} from 'reactjs-localstorage';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	fields:{gender:'male',hobby:[]},
			errors:{},
            city:[],
            hobby:[]
		};
    }

    componentDidMount(){
        reactLocalStorage.set('userData', "");
        reactLocalStorage.set('is_admin', 0);
        fetch(configuration.baseURL+"common_list").then((response) =>{
	    	return response.json();
	    }).then((data)=> {
			this.setState({ hobby:data.payload.hobby, city:data.payload.city});
		});
    }

    handleChange(field,value = '', e){
    	let fields = this.state.fields
        if(field === 'hobby')
        {
            const hobby = fields[field];
            if(hobby.includes(e.target.value))
            {
                fields[field].pop(e.target.value);
            }
            else{
                fields[field].push(e.target.value);
            }
        }
        else if(field === 'gender')
        {
            fields[field] = value;
        }
        else
        {            
    	    fields[field] = e.target.value;
        }
    	this.setState({fields})
    }

    validation(){
    	let fields = this.state.fields;
        console.log(fields);
        let errors = {};
        let formIsValid = true;

        if(!fields["firstname"]){
            formIsValid = false;
            errors["firstname"] = "Please enter first name.";
		}
		
		if(!fields["lastname"]){
            formIsValid = false;
            errors["lastname"] = "Please enter last name.";
		}
        

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

        if(!fields["password_confirmation"]){
            formIsValid = false;
            errors["password_confirmation"] = "Please enter confirm password.";
        }
        if(fields["password_confirmation"]){
            if(fields["password"] !== fields["password_confirmation"]){
                formIsValid = false;
            	errors["password_confirmation"] = "Password does not match.";
            }
        }

        if(!fields["city_id"]){
            formIsValid = false;
            errors["city_id"] = "Please select city.";
		}

        if(!fields["gender"]){
            formIsValid = false;
            errors["gender"] = "Please select gender.";
		}

        if(!fields["hobby"] || fields["hobby"].length === 0){
            formIsValid = false;
            errors["hobby"] = "Please select hobby.";
		}

        this.setState({errors: errors});
        return formIsValid;
    }

    handleSubmit(){
        
    	if (this.validation()) {
			let fields = this.state.fields;
            if(typeof fields['hobby'] === "object")
            {
                fields['hobby'] = fields['hobby'].join();  
            }
            
			fetch(configuration.baseURL+"register", {
					method: "post",
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body:JSON.stringify(fields)
				}).then((response) => {
					return response.json();
				}).then((data) => {
                    console.log(data);
					if (data.status === 200) {
						this.props.history.push('/sign-in')
					}else if(data.status === 402){
						return toast.error(data.errors.original.errors);
					}else{
						return toast.error("Something wrong");
					}
					
			});
    	}
  
    }

    render() {
        return (
            <div >
                <form>
                    <ToastContainer position="top-right" autoClose={5000} style={{top:'80px'}}/>
                    <h3>Sign Up</h3>
                    <div class="container register">
                        <div class="row">
                            <div class="col">
                                <div className="form-group">
                                    <label>First name</label>
                                    <input type="text" className="form-control" placeholder="First name" onChange={this.handleChange.bind(this,'firstname','')} value={this.state.fields.firstname}/>
                                    <span style={{color: "red",fontSize:"15px",float:"left"}}>{this.state.errors.firstname}</span>
                                </div>
                            </div>
                            <div class="col">
                                <div className="form-group">
                                    <label>Last name</label>
                                    <input type="text" className="form-control" placeholder="Last name" onChange={this.handleChange.bind(this,'lastname','')} value={this.state.fields.lastname}/>
                                    <span style={{color: "red",fontSize:"15px",float:"left"}}>{this.state.errors.lastname}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input type="email" className="form-control" placeholder="Enter email" onChange={this.handleChange.bind(this,'email','')} value={this.state.fields.email} />
                                    <span style={{color: "red",fontSize:"15px",float:"left"}}>{this.state.errors.email}</span>
                                </div>
                            </div>

                            <div class="col">
                                <div className="form-group">
                                    <label>Select City</label>
                                    <select className="form-control" onChange={this.handleChange.bind(this,'city_id','')}>
                                        <option value="">Select City</option>
                                        {
                                            this.state.city.map((e, key) => {
                                                return <option key={key} value={e.id}>{e.title}</option>;
                                            })
                                        }
                                    </select>
                                    <span style={{color: "red",fontSize:"15px",float:"left"}}>{this.state.errors.city_id}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.handleChange.bind(this,'password','')} value={this.state.fields.password} />
                                    <span style={{color: "red",fontSize:"15px",float:"left"}}>{this.state.errors.password}</span>
                                </div>
                            </div>
                            <div class="col">
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input type="password" className="form-control" placeholder="Enter confirm password" onChange={this.handleChange.bind(this,'password_confirmation','')} value={this.state.fields.password_confirmation}/>
                                    <span style={{color: "red",fontSize:"15px",float:"left"}}>{this.state.errors.password_confirmation}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div className="form-group">
                                    <label>Gender</label>
                                    <br/>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked onChange={this.handleChange.bind(this,'gender','male')}/>
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Male
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={this.handleChange.bind(this,'gender','female')}/>
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            Female
                                        </label>
                                    </div>
                                    <span style={{color: "red",fontSize:"15px",float:"left"}}>{this.state.errors.gender}</span>
                                </div>
                            </div>
                            <div class="col">
                                <div className="form-group">
                                    <label>Hobbby</label>
                                    <br/>
                                        {
                                            this.state.hobby.map((e, key) => {
                                                return <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value={e.id} id={e.id}  onChange={this.handleChange.bind(this,'hobby','')} style={{float: "left !important",}}/>
                                                <label class="form-check-label" for={e.id}>
                                                    {e.title}
                                                </label>
                                            </div>;
                                            })
                                        }
                                    <span style={{color: "red",fontSize:"15px",float:"left"}}>{this.state.errors.hobby}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div>
                                <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit.bind(this)}>Sign Up</button>
                            </div>
                            <br/>
                            <p className="forgot-password text-right">
                                Already registered <Link to={"/sign-in"}>sign in?</Link>
                            </p>
                        </div>

                    </div>

                   
                </form>
            </div>
        );
    }
}
