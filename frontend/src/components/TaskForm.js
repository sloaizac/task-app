import React from 'react';
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
        if (this.props.show) {
            return (
                <div className="backdrop" style={backdropStyle}>
                    <div className="modal" style={modalStyle}>
                        <div className="card">
                            <div className="card-header text-general">
                                <h3>Create tasks</h3>
                            </div>
                            <div className="card-body">
                                <form>
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
                                </form>
                            </div>
                            <div className="card-footer text-general">
                                <button type="submit" className="btn btn-primary m-2" onClick={this.onSubmit}>Save</button>
                                <button type="submit" className="btn btn-secondary m-2" onClick={this.props.onClose}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}

// The gray background
const backdropStyle = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)'
};

// The modal "window"
const modalStyle = {
    position: "initial",
    borderRadius: 5,
    maxWidth: 500,
    minHeight: 300,
    margin: '0 auto',
    padding: 30,
    display: "block"
};


export default TaskForm;