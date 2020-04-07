import React from "react";
import { Link } from "react-router-dom";
import {isAuthenticated} from "../validation";

export default class Navigation extends React.Component {

    logOut() {
        localStorage.removeItem('access-token');
        localStorage.removeItem('user');
        window.location.href = '/';
    }

    render() {

        return (
            < nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between text-general ">
                <div className="d-flex justify-content-start">
                    <div> 
                        <Link className="navbar-brand card bg-secondary text-white p-1" to="/">
                            Planner
                        </Link>
                    </div>

                    {
                        (isAuthenticated()) ? (
                            <div className="container d-flex justify-content-start ml-2 p-0"><Link className="navbar-brand" to="/notes">Notes</Link>
                                <Link className="navbar-brand" to="/projects">Projects</Link>
                                <Link className="navbar-brand" to="/calendar">Calendar</Link></div>
                        ) : (null)
                    }

                </div>
                <div>
                    {
                        (isAuthenticated()) ? (
                            <button className="btn btn-success" onClick={this.logOut} >
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
            </nav >
        )

    }
}