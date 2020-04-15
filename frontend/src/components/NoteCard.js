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
            <div className="card m-2 d-md-flex d-sm-flex d-lg-flex card-note" key={this.props.n.id}>
                <div className="card-header d-flex justify-content-around">
                    <input type="text" name="title" value={this.state.title} style={inputStyle} onChange={this.onChange} />
                    <button className="btn m-2" onClick={() => this.props.deleteNote(this.props.n.id)}>
                        <img src="trash.png" alt="delete" width="20" height="20" />
                    </button>
                </div>
                <div className="card-body p-0">
                    <textarea name="description" style={taStyle} value={this.state.description} onChange={this.onChange} />
                    <div className="d-flex justify-content-end mt-1">
                        {this.state.doneButton}
                    </div>
                </div>

            </div>
        )
    }

}

const taStyle = {
    border: "none",
    outline: "none",
    background: "none",
    height: "200px",
    width: "100%"
}

const inputStyle = {
    border: "none",
    outline: "none",
    background: "none"
}