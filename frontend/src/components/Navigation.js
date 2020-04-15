import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../validation";

export default class Navigation extends React.Component {

    logOut() {
        localStorage.removeItem('access-token');
        localStorage.removeItem('user');
        window.location.href = '/';
    }

    render() {

        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark d-flex justify-content-between text-general ">

                <Link className="navbar-brand" to="/">
                    Planner
                        </Link>
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarCollapse">


                    {
                        (isAuthenticated()) ? (
                            <div className="navbar-nav">
                                <Link className="nav-item nav-link" to="/notes">Notes</Link>
                                <Link className="nav-item nav-link" to="/projects">Projects</Link>
                                <Link className="nav-item nav-link" to="/calendar">Calendar</Link></div>
                        ) : (null)
                    }

                    <div className="navbar-nav ml-auto">
                        {
                            (isAuthenticated()) ? (
                                <button className="nav-link btn btn-success" onClick={this.logOut} >
                                    Logout
                                </button>) : (<div>
                                    <Link className="btn btn-success m-2" to="/login" >
                                        Login
                            </Link>
                                    <Link className="btn btn-success m-2" to="/register" >
                                        Register
                            </Link>
                                </div>)
                        }
                    </div>

                </div>

            </nav >
        )

    }
}