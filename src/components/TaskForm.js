import React from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

class TaskForm extends React.Component {
    state = {
        title: "",
        description: "",
        date: new Date()
    }

    onSubmit = (event) => {
        this.props.addTask(this.state.title, this.state.description, this.state.date);
        event.preventDefault();
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onChangeDate = (date) => {
        this.setState({
            date: date
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

                    <div className="form-group">
                        <DatePicker name="date" selected={this.state.date} onChange={this.onChangeDate} />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-outline-primary" onClick={this.onSubmit}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskForm;