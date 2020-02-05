import React from 'react';

class TaskForm extends React.Component {
    state = {
        title: "",
        description: ""
    }

    onSubmit = (event) => {
        this.props.addTask(this.state.title, this.state.description);
        event.preventDefault();
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className="col-md-10 ml-3 mt-3">
                <div className="card card-body">
                    <h3>Task form</h3>
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            name="title"
                            placeholder="write a task"
                            onChange={this.onChange} />
                    </div>

                    <div className="form-group">
                        <textarea
                            className="form-control"
                            placeholder="Write a description"
                            name="description"
                            onChange={this.onChange}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-outline-primary" onClick={this.onSubmit}>Save</button>
                </div>
            </div>
        );
    }
}

export default TaskForm;