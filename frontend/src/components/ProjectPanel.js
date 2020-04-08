import React from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskList from './TaskList';


export default class ProjectPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.project.id,
            title: props.project.title,
            description: props.project.description,
            doneButton: "",
            panel: false
        }
    }

    static getDerivedStateFromProps(props, state) {

        if (props.project.id !== state.id) {
                
            return {
                id: props.project.id,
                title: props.project.title,
                description: props.project.description,
                doneButton: ""
            }
        }
        return null
    }


    addTask = async (newTask) => {
        await axios.post('http://localhost:4000/tasks', newTask);
        this.props.showProject(this.props.project.id);
        this.onClose();
    }

    deleteAlert = (id) => {
        if (window.confirm("¿Eliminar este proyecto y sus tareas?") === true) {
            this.props.deleteProject(id);
        }
    }

    handleClickAddTasks = () => {      
        this.setState({ panel: true });
    }

    save = () => {
        const newProject = {
            id: this.state.id,
            title: this.state.title,
            description: this.state.description
        }
        this.props.updateProject(this.state.id, newProject);
        this.setState({
            doneButton: ""
        })
    }

    onChange = (e) => {  
        this.setState({
            [e.target.name]: e.target.value,
            doneButton: <button className="btn btn-success btn-sm" onClick={this.save}>done</button>
        })

    }

    onClose = () => {
        this.setState({
            panel: false
        })
    }



    render() {
   
        return (
            <div className="container">
                <div className="col-12 row d-flex justify-content-between">
                    <input type="text" name="title" style={inputStyle} value={this.state.title} onChange={this.onChange} />
                    <div>
                        <button className="btn btn-outline-danger m-1" onClick={() => this.deleteAlert(this.props.project.id)}>
                            Delete
                        </button>
                        <button className="btn btn-outline-success m-1" onClick={this.handleClickAddTasks}>
                            Add tasks
                        </button>
                    </div>
                </div>
                <div className="mt-2">
                    <textarea name="description" style={taStyle} value={this.state.description} onChange={this.onChange} />
                    <div className="m-2">{this.state.doneButton}</div>
                </div>
                <div>
                    <TaskList tasks = {this.props.project.tasks} project_id={this.state.id} showProject={this.props.showProject} />
                </div>
                <div className="mt-2"></div>
                <TaskForm project_id={this.state.id} addTask={this.addTask} show={this.state.panel} onClose={this.onClose} />
            </div>
        )
    }
}

const taStyle = {
    border: "none",
    outline: "none",
    background: "none",
    height: "150px",
    width: "700px"
}

const inputStyle = {
    border: "none",
    outline: "none",
    background: "none",
    fontSize: "170%"
}
