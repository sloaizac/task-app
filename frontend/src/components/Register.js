import React from "react";
import axios from "axios";

export default class Register extends React.Component{

    state ={
        username: null,
        email: null,
        password: null,
        confirmPassword: null
    }


    onSubmit = async () => {
        if(this.state.password !== this.state.confirmPassword){
            console.log("Password not coincide");
        }else{
            const register = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
            await axios.post("http://localhost:4000/register", register)
            .then(response => {
                console.log(response);
                window.location.href = '/login';
              })
              .catch(err => {
                console.log(err)
                window.location.href = '/register';
              })
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        return(
            <div className="card col-4 mx-auto mt-5">
                <div className="card-header text-general">
                    <h3>Register</h3>
                </div>
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <label>username</label>
                        <input type="text" name="username" className="form-control" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>email</label>
                        <input type="text" name="email" className="form-control" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>password</label>
                        <input type="password" className="form-control" name="password" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>confirm password</label>
                        <input type="password" className="form-control" name="confirmPassword" onChange={this.onChange} />
                    </div>
                </form>
            </div>
            <div className="card-footer text-general">
                <button className="btn btn-primary btn-block" onClick={this.onSubmit} >
                    Register
                </button>
            </div>
        </div>
        )
    }
}