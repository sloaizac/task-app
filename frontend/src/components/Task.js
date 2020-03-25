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
                cardTask: <div className="card col-5">
                    <div className="card-header">
                        {task.title}
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

        return (
            <div className="row">
                <li className="list-group-item d-flex justify-content-between align-items-center mt-1 col-4" key={this.props.t.id} >
                    <input type="checkbox" className="mr-1" name="done" />
                    <div onClick={() => this.showDescription(this.props.t)} >{this.props.t.title}</div>
                    <button className="btn" onClick={() => this.props.deleteTask(this.props.t.id)}>
                        <img src="trash.png" alt="delete_task" width="15" height="15" />
                    </button>
                </li>
                {this.state.cardTask}
            </div>
        )
    }
}


export default Task;