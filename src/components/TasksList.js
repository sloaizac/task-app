import React from 'react';
import Task from './Task';
import PropTypes from 'prop-types';

export default class TasksList extends React.Component {


    render() {
        return this.props.tasks.map((e) => <Task task={e} key={e.id} deleteTask={this.props.deleteTask} checkDone={this.props.checkDone} setTask={this.props.setTask}/>) 
    }
}

Task.propTypes = {
    tasks: PropTypes.array.isRequired
}

