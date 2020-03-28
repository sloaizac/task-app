import React from 'react';

export default class NoteForm extends React.Component {

    state = {
        title: "",
        description: ""
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addNote(this.state.title, this.state.description);
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        if (this.props.show) {

            // The gray background
            const backdropStyle = {
                position: 'fixed',
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

            return (
                <div className="backdrop" style={backdropStyle}>
                    <div className="modal" style={modalStyle}>
                        <div className="card">
                            <div className="card-header">
                                <h3>Create note</h3>
                            </div>
                            <div className="card-body">
                            <form className="m-2">
                                <div className="form-group">
                                    <input type="text" className="form-control"
                                        name="title" onChange={this.onInputChange} placeholder="title" />
                                </div>
                                <div className="form-group">
                                    <textarea name="description" className="form-control"
                                        onChange={this.onInputChange} placeholder="description"></textarea>
                                </div>
                                
                            </form>
                            </div>
                            <div className="card-footer">
                            <button type="submit" className="btn btn-primary m-2" onClick={this.onSubmit}>
                                    Create note
                                </button>
                                <button type="submit" className="btn btn-secondary m-2" onClick={this.props.onClose}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return null
    }

    }