import React from "react";

export default class NoteCard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: this.props.n.title,
            description: this.props.n.description,
            doneButton: ""
        }
    }

    save = () => {
        const newNote = {
            id: this.props.n.id,
            title: this.state.title,
            description: this.state.description
        }
        this.props.updateNote(this.props.n.id, newNote);
        this.setState({
            doneButton: ""
        })
    }

    onChange = (e) => { 
        this.setState({
            [e.target.name]: e.target.value,
            doneButton: <button className="btn btn-success btn-sm" onClick={this.save}>done</button> 
        })
        
    }

    render() {
        return (
            <div className="card m-2 col-3 card-note" key={this.props.n.id}>
                <div className="card-header">
                    <input type="text" name="title" value={this.state.title} style={inputStyle} onChange={this.onChange} />
                </div>
                <div className="card-body">
                    <textarea name="description" style={taStyle} value={this.state.description} onChange={this.onChange} />
                    <div className="d-flex justify-content-end mt-1">
                    {this.state.doneButton}
                    </div>
                </div>
                <button className="btn card-footer" onClick={() => this.props.deleteNote(this.props.n.id)}>
                    <img src="trash.png" alt="delete" width="20" height="20" />
                </button>
            </div>
        )
    }

}

const taStyle = {
    border: "none",
    outline: "none",
    background: "none",
    height: "200px"
}

const inputStyle = {
    border: "none",
    outline: "none",
    background: "none"
}