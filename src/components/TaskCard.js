import React from "react";

export default class TaskCard extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="card ml-4 mt-4">
                    <div className="card-header d-flex justify-content-between">
                        {this.props.task.title}
                    </div>
                    <div className="card-body">
                        {this.props.task.description}
                    </div>
                    <button className="btn btn-primary mt-2 ">Done</button>
                    <button className="btn btn-danger mt-1">Delete</button>
                </div>
            </div>
        )
    }
}