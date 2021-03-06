import React from "react";
import TimePicker from "rc-time-picker";

import "rc-time-picker/assets/index.css";


export default class ModalEvent extends React.Component {

    state = {
        id: this.props.id,
        eventId: this.props.eventId,
        edit: false,
        title: "",
        start: this.props.start._d,
        end: this.props.end._d
    }

    onSubmit = () => {
        const newEvent = {
            user_id: localStorage.getItem('user'),
            eventId: this.state.eventId,
            title: this.state.title,
            start: this.state.start,
            end: this.state.end
        }
        this.props.addEvent(newEvent);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.id !== state.id) {
            return {
                id: props.id,
                eventId: props.eventId,
                edit: props.edit,
                title: props.title,
                start: props.start._d,
                end: props.end._d
            }
        }
        return null;

    }

    onChangeStart = ({ _d }) => {
        this.setState({
            start: _d
        })

    }

    onChangeEnd = ({ _d }) => {
        this.setState({
            end: _d
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        if (this.props.show) {

            return (
                <div className="backdrop" style={backdropStyle}>
                    <div className="modal" style={modalStyle}>
                        <div className="card">
                            <div className="card-header text-general">
                                {
                                    (this.state.edit) ? <div className="d-flex justify-content-between">
                                        <h3>Edit event</h3>
                                        <button className="btn" onClick={() => this.props.deleteEvent(this.state.eventId)}>
                                            <img src="trash.png" alt="delete_task" width="15" height="15" />
                                        </button>
                                    </div> : <h3>Create event</h3>
                                }
                            </div>
                            <div className="card-body">
                                <form className="m-2">
                                    <div className="form-group">
                                        <input name="title" type="text" className="form-control" placeholder="Event title" value={this.state.title} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="m-1 p-1" >start:</label>
                                        <TimePicker
                                            defaultValue={this.props.start}
                                            showSecond={false}
                                            onChange={this.onChangeStart}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="m-1 p-1" >end:</label>
                                        <TimePicker
                                            defaultValue={this.props.end}
                                            showSecond={false}
                                            onChange={this.onChangeEnd}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer text-general">
                                <button className="btn btn-primary m-2" onClick={this.onSubmit}>
                                    Create event
                                </button>
                                <button className="btn btn-secondary m-2" onClick={this.props.onClose}>
                                    Cancel
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            )
        }
        return null;
    }
}

// The gray background
const backdropStyle = {
    position: 'absolute',
    zIndex: "100",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)'
};

// The modal "window"
const modalStyle = {
    position: "initial",
    borderRadius: 5,
    maxWidth: 500,
    minHeight: 300,
    margin: '0 auto',
    padding: 30,
    display: "block"
};