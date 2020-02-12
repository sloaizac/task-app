import React from "react";
import TasksList from './TasksList';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import tasks from '../samples/tasks.json'
import '../App.css'

export default class Principal extends React.Component {

    state = {
        tasks: tasks,
        taskToShow: tasks[0],
        showForm: false
    }

    deleteTask = (id) => {
        const newTasks = this.state.tasks.filter((task) => task.id !== id);
        this.setState({
            tasks: newTasks
        });
    }

    checkDone = (id) => {
        const newTasks = this.state.tasks.map((task) => {
            if (task.id === id) {
                task.done = !task.done;
            }
            return task;
        });
        this.setState({
            tasks: newTasks
        });
    }

    addTask = (title, description, date) => {
        const newTask = {
            title: title,
            description: description,
            date: date,
            id: this.state.tasks.length
        }
        this.setState({
            tasks: [...this.state.tasks, newTask]
        });
    }

    setTask = (task) => {
        this.setState({
            taskToShow: task,
            showForm: false
        })
    }

    showForm = () => {
        this.setState({
            showForm: true
        })
    }

    styleCompleted() {
        return {
            height: "650px",
            overflowY: "scroll",
        }
    }

    style() {
        return {
            borderRight: "1px solid #ececec",
            backgroundColor: "#f8f8f8",
            margin: "0",
            maxWidth: "70px",
            marginBottom: "0"
        }
    }

    render() {
        let element;
        if (this.state.showForm) {
            element = <TaskForm addTask={this.addTask} />;
        }
        else {
            element = <TaskCard task={this.state.taskToShow} checkDone={this.checkDone}
                deleteTask={this.deleteTask} />;
        }
        return (
            <div className="container-fluid" >
                <div className="row">
                    <div className="col-md-1" style={this.style()}>
                        <div className="flex-column justify-content-around">
                            <label className="mt-5 ml-1">
                                <i className="fas fa-carrot fa-2x"></i>
                            </label>

                            <label className="btn fas fa-plus-circle fa-2x p-1" onClick={this.showForm}></label>

                        </div>
                    </div>
                    <div className="col-md-4" style={this.styleCompleted()}>

                        <TasksList tasks={this.state.tasks}
                            setTask={this.setTask}
                            checkDone={this.checkDone}
                            deleteTask={this.deleteTask}
                        />
                    </div>
                    <div className="col-md-7">
                        <div className="row">
                            {element}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}