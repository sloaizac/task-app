import React from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import Task from './Task';


export default class ProjectPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.project.id,
            title: props.project.title,
            description: props.project.description,
            doneButton: "",
            displayTaskCard: [],
            panel: "",
            barState: 0
        }
    }

    componentDidMount() {
        this.setState({
            displayTaskCard: new Array(this.props.project.tasks.length).fill(false)
        })

    }


    static getDerivedStateFromProps(props, state) {

        const barState = () => {
            let totalTask = props.project.tasks.length;
            let doneTasks = 0;
            props.project.tasks.forEach(t => {
                if (t.done) {
                    doneTasks++;
                }
            })
            return parseInt((doneTasks * 100) / totalTask);
        }

        if (props.project.id !== state.id ||
            props.project.tasks.length !== state.displayTaskCard.length || barState() !== state.barState) {
            return {
                id: props.project.id,
                title: props.project.title,
                description: props.project.description,
                doneButton: "",
                barState: barState(),
                displayTaskCard: new Array(props.project.tasks.length).fill(false),
                panel: ""
            }
        }
        return null
    }

    addTask = async (newTask) => {
        await axios.post('http://localhost:4000/tasks', newTask);
        this.props.showProject(this.props.project.id);
    }


    deleteAlert = (id) => {
        if (window.confirm("¿Eliminar este proyecto y sus tareas?") === true) {
            this.props.deleteProject(id);
        }
    }

    deleteTask = async (id) => {
        await axios.delete("http://localhost:4000/tasks/" + id);
        this.props.showProject(this.props.project.id);
    }

    doneTask = async (task) => {
        const newTask = {
            id: task.id,
            title: task.title,
            description: task.description,
            done: !task.done
        }
        await axios.put("http://localhost:4000/tasks/" + task.id, newTask);
        this.props.showProject(this.props.project.id);
    }

    handleClickAddTasks = () => {
        this.setState({ panel: <TaskForm project_id={this.state.id} addTask={this.addTask} /> });
    }

    displayTaskCard = (id) => {
        let taskIndex = this.props.project.tasks.map(t => { return t.id }).indexOf(id);
        let temp = this.state.displayTaskCard;
        temp[taskIndex] = !this.state.displayTaskCard[taskIndex];
        this.setState({
            displayTaskCard: temp
        })
        return this.state.displayTaskCard[taskIndex];
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

    render() {

        const barStyle = {
            width: this.state.barState + "%"
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

        return (
            <div className="container">
                <div className="col-9 row d-flex justify-content-between">
                    <input type="text" name="title" style={inputStyle} value={this.state.title} onChange={this.onChange} />
                    <div>
                        <button className="btn btn-outline-danger m-1" onClick={() => this.deleteAlert(this.props.project.id)}>
                            Delete
                        </button>
                        <button className="btn btn-outline-success m-1" onClick={() => this.handleClickAddTasks()}>
                            Add tasks
                        </button>
                    </div>
                </div>
                <div className="mt-2">
                    <textarea name="description" style={taStyle} value={this.state.description} onChange={this.onChange} />
                    <div className="m-2">{this.state.doneButton}</div>
                </div>
                <div className="container mt-2">
                    <ul className="list-group">
                        {this.props.project.tasks.map((t) => (
                            <Task t={t} key={t.id} deleteTask={this.deleteTask}
                                displayTaskCard={this.displayTaskCard} doneTask={this.doneTask} />
                        ))}
                    </ul>
                </div>
                <div className="container">
                    {this.state.panel}
                </div>
                <div className="progress col-9 mt-5">
                    <div className="progress-bar" role="progressbar" style={barStyle} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{this.state.barState}%</div>
                </div>
            </div>
        )
    }
}