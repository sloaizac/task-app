import React from "react";
import axios from "axios";

export default class Login extends React.Component {

    state = {
        username: "",
        password: ""
    }

    onSubmit = async () => {
        const login = {
            username: this.state.username,
            password: this.state.password
        }
        await axios.post("http://localhost:4000/login", login)
        .then(response => {
            localStorage.setItem('user', response.data);
            window.location.href = '/notes';
          })
          .catch(err => {
            console.log(err)
            window.location.href = '/login';
          })
        
    }
    
    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>username</label>
                            <input type="text" name="username" className="form-control" onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <label>password</label>
                            <input type="password" className="form-control" name="password" onChange={this.onChange} />
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <button className="btn btn-primary" onClick={this.onSubmit} >
                        Login
                    </button>
                </div>
            </div>
        )
    }
}