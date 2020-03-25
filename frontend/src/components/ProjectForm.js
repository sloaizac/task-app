import React from 'react';
//import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

class ProjectForm extends React.Component {

    state = {
        title: "",
        description: ""
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const newProject = { title: this.state.title, description: this.state.description }
        await axios.post('http://localhost:4000/projects', newProject)
        this.props.getProjects()
        
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
        <div className="card">
            <div className="card-header">
                <h5>Create project</h5>
            </div>
            <form className="p-2">
                <div className="form-group">
                    <label for="name" >Project title</label>
                    <input type="text" onChange={this.onChange} name="title" id="name" className="form-control" />
                </div>
                <div className="form-group">
                    <label for="description" >Description</label>
                    <textarea onChange={this.onChange} name="description" id="description" className="form-control" />
                </div> 
                <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Create</button>   
            </form>    
        </div>           
        )
    }
}

export default ProjectForm;