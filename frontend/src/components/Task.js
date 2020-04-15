import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
//import '../App.css';

// Podemos utilizar archivos de css o codigo de javaScript como el siguiente para los estilos

class Task extends React.Component {

    state = {
        cardTask: ""
    }

    showDescription = (task) => {
        let  display = this.props.displayTaskCard();
        if(display){
            this.setState({
                cardTask: <div className="card task-card">
                    <div className="card-header d-flex justify-content-around">
                        {task.title}
                        <button className="btn" onClick={() => this.props.deleteTask(this.props.t.id)}>
                        <img src="trash.png" alt="delete_task" width="15" height="15" />
                    </button>
                    </div>
                    <div className="card-body">
                        {task.description}
                    </div>
                </div>
            })
        }else{
            this.setState({
                cardTask: ""
            })
        }
    }

    render() {

        const styleTask = {
            textDecoration: this.props.t.done ? "line-through" : "none",
        }

        return (
            <div className="row">
                <li className="d-flex justify-content-between align-items-center mt-1" key={this.props.t.id} style={styleTask} >
                    <input type="checkbox" className="mr-1" id={this.props.id} name="done" onChange={() => this.props.doneTask(this.props.t)} checked={this.props.t.done} />
                    <div className="m-2" onClick={() => this.showDescription(this.props.t)} >{this.props.t.title}</div>
                </li>
                {this.state.cardTask}
            </div>
        )
    }

    

}



export default Task;