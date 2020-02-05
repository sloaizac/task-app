import React from 'react';
import PropTypes from 'prop-types';
import '@fortawesome/fontawesome-free/css/all.css';
//import '../App.css';

// Podemos utilizar archivos de css o codigo de javaScript como el siguiente para los estilos

class Task extends React.Component {

    styleCompleted() {
        return {
            color: this.props.task.done ? 'gray' : 'black',
            textDecoration: this.props.task.done ? 'line-through' : 'none',
            width: "100%",
            height: "150px",
            overflow: "hidden"
        }
    }


    render() {

        const { task } = this.props;
        return (
            <div className="card mh-100 mw-50 mb-3 mt-3" style={this.styleCompleted()} onClick={(e) => this.props.setTask(task)}>
                <div className="card-header d-flex justify-content-between">
                    <h5 className="card-title">{task.title}</h5>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary btn-sm"
                            onClick={() => this.props.checkDone(task.id)}>Done</button>
                        <button className="fas fa-trash-alt btn btn-outline-danger pt-2 ml-1" onClick={() => this.props.deleteTask(task.id)} />
                    </div>
                </div>
                <div className="card-body d-flex justify-content-between" >
                    <p className="card-text">
                        {task.description}
                    </p>
                </div>
            </div>
        )
    }
}

Task.propTypes = {
    task: PropTypes.object.isRequired
}


export default Task;