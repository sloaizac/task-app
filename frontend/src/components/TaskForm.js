import React from 'react';
//import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

class TaskForm extends React.Component {

    state = {
        title: "",
        description: ""
    }


    onSubmit = async (event) => {
        event.preventDefault();
        const newTask = { project_id: this.props.project_id, title: this.state.title, description: this.state.description };
        this.props.addTask(newTask);
        this.props.reset();
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    /*onChangeDate = (date) => {
        this.setState({
            date: date
        })
    }*/

    render() {
        return (
            <div className="card col-4">
                <form>
                <div className="card-header">
                    <h5>Create tasks</h5>
                </div>
                <div className="form-group">
                    <input type="text"
                        name="title"
                        className="form-control"
                        placeholder="write a title"
                        onChange={this.onChange} />
                </div>
                <div className="form-group">
                    <textarea
                        placeholder="Write a description"
                        name="description"
                        className="form-control"
                        onChange={this.onChange}
                    ></textarea>
                </div>

                    <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Save</button>
                </form>
            </div>

        );
    }
}

export default TaskForm;