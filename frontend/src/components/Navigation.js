import React from "react";
import { Link } from "react-router-dom";

export default class Navigation extends React.Component {

    render() {
        console.log(window.$user);
        
        if(window.$user){
            return (
                < nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between ">
                    <div className="d-flex justify-content-start">
                    <div>
                        <Link className="navbar-brand" to="/">
                            <img src="/Happy_smiley_face.png" alt="logo" width="45" height="35" />
                        </Link>
                    </div>
                    <div className="container d-flex justify-content-start ml-2 p-0">
                        <Link className="navbar-brand" to="/notes">Notes</Link>
                        <Link className="navbar-brand" to="/projects">Projects</Link>
                        <Link className="navbar-brand" to="/calendar">Calendar</Link>
                    </div>
                    </div>
                    <div>
                        <button className="btn btn-success">
                            Logout
                        </button>
                    </div>
                </nav >
            ) 
        }else{
            return(
                    < nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between ">
                        <div className="d-flex justify-content-start">
                        <div>
                            <Link className="navbar-brand" to="/">
                                <img src="/Happy_smiley_face.png" alt="logo" width="45" height="35" />
                            </Link>
                        </div>
                        </div>
                        <div>
                            <Link className="btn btn-success" to="/login" >
                                Login
                            </Link>
                        </div>
                    </nav >                
            )
        }
    }
}