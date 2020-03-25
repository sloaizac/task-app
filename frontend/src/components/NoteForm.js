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
        return (
            <div className="card col-4">
                <form className="m-2">
                    <div className="form-group">
                        <input type="text" className="form-control"
                            name="title" onChange={this.onInputChange} placeholder="title" />
                    </div>
                    <div className="form-group">
                        <textarea name="description" className="form-control"
                            onChange={this.onInputChange} placeholder="description"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>
                        Create note
                </button>
                </form>
            </div>
        )
    }

}