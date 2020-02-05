import React from "react";
import TasksList from './TasksList';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import tasks from '../samples/tasks.json'

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

    addTask = (title, description) => {
        const newTask = {
            title: title,
            description: description,
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
            height: "600px",
            overflowY: "scroll"
        }
    }

    render() {
        let element;
        if (this.state.showForm) {
            element = <TaskForm addTask={this.addTask}/>;
        }
        else {
            element = <TaskCard task={this.state.taskToShow}/>;
        }
        return (
            <div className="container-fluid" >
                <div className="row">
                    <div className="col-md-5" style={this.styleCompleted()}>
                        
                        <TasksList tasks={this.state.tasks}
                            setTask={this.setTask}
                            checkDone={this.checkDone}
                            deleteTask={this.deleteTask}
                        />
                    </div>
                    <div className="col-md-7">
                        <div className="row">
                            <button className="btn btn-outline-success mt-2 ml-4" onClick={this.showForm}>
                                Add task
                            </button>
                        </div>
                        <div className="row">
                            {element}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}