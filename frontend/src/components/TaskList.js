import React from "react";
import axios from "axios";

import Task from './Task';

export default class TaskList extends React.Component{

    state = {
        id: this.props.project_id,
        displayTaskCard: [],
        barstate: 0
    }

    componentDidMount() {
        this.setState({
            displayTaskCard: new Array(this.props.tasks.length).fill(false)
        })
    }

    static getDerivedStateFromProps(props, state) {
        const barState = () => {
            let totalTask = props.tasks.length;
            let doneTasks = 0;
            props.tasks.forEach(t => {
                if (t.done) {
                    doneTasks++;
                }
            })
            return parseInt((doneTasks * 100) / totalTask);
        }

        if (props.project_id !== state.id ||
            props.tasks.length !== state.displayTaskCard.length || barState() !== state.barState) {
                
            return {
                id: props.project_id,
                barState: barState(),
                displayTaskCard: new Array(props.tasks.length).fill(false),
            }
        }
        return null
    }

    deleteTask = async (id) => {
        await axios.delete("http://localhost:4000/tasks/" + id);
        this.props.showProject(this.props.project_id);
    }

    doneTask = async (task) => {
        const newTask = {
            id: task.id,
            title: task.title,
            description: task.description,
            done: !task.done
        }
        await axios.put("http://localhost:4000/tasks/" + task.id, newTask);
        this.props.showProject(this.props.project_id);
    }

    displayTaskCard = (id) => {
        let taskIndex = this.props.tasks.map(t => { return t.id }).indexOf(id);
        let temp = this.state.displayTaskCard;
        temp[taskIndex] = !this.state.displayTaskCard[taskIndex];
        this.setState({
            displayTaskCard: temp
        })
        return this.state.displayTaskCard[taskIndex];
    }


    render(){
        const barStyle = {
            width: this.state.barState + "%"
        }

        return(
            <div>
                <div className="container mt-2">
                    <ul className="list-group">
                        {this.props.tasks.map((t) => (
                            <Task t={t} key={t.id} deleteTask={this.deleteTask}
                                displayTaskCard={this.displayTaskCard} doneTask={this.doneTask} />
                        ))}
                    </ul>
                </div>
                <div className="progress col-9 mt-5">
                    <div className="progress-bar" role="progressbar" style={barStyle} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{this.state.barState}%</div>
                </div>    
            </div>
        )

    }
}