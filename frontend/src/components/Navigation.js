import React from "react";
import { Link } from "react-router-dom";

export default class Navigation extends React.Component {

    render() {
        return (
            < nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div>
                    <Link className="navbar-brand" to="/">
                        <img src="/Happy_smiley_face.png" alt="logo" width="45" height="35" />
                    </Link>
                </div>
                <div className="container d-flex justify-content-start ml-2 p-0">
                    <Link className="navbar-brand" to="/projects">Projects</Link>
                    <Link className="navbar-brand" to="/week">Week</Link>
                </div>
            </nav >
        )
    }
}