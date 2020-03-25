import React from "react";
import axios from "axios";

import NoteForm from './NoteForm';

export default class Notes extends React.Component {

    state = {
        notes: [],
        noteForm: ""
    }

    componentDidMount() {
        this.getNotes();
    }

    getNotes = async () => {
        const result = await axios.get('http://localhost:4000/notes');
        this.setState(
            {
                notes: result.data,
                noteForm: ""
            }
        )
    }

    addNote = async (note_title, note_description) => {
        const newNote = {
            title: note_title,
            description: note_description
        }
        await axios.post('http://localhost:4000/notes', newNote);
        this.getNotes();
    }

    noteForm() {
        this.setState({
            noteForm: <NoteForm addNote={this.addNote} />
        })
    }

    deleteNote = async (id) => {
        const result = await axios.delete('http://localhost:4000/notes/' + id);
        console.log(result);
        this.getNotes();
    }



    render() {

        return (
            <div className="container pt-2">
                <div className="row">
                    <h2>Notes</h2>
                    <button className="btn btn-success ml-5" onClick={() => this.noteForm()}>
                        Add note
                    </button>
                </div>
                <div className="row mt-2">
                    {
                        this.state.notes.map((n) => (
                            <div className="card m-2 col-3" key={n.id}>
                                <div className="card-header">
                                    <h6>{n.title}</h6>
                                </div>
                                <div className="card-body">
                                    {n.description}
                                </div>
                                <button className="btn card-footer" onClick={() => this.deleteNote(n.id)}>
                                    <img src="trash.png" alt="delete" width="20" height="20" />
                                </button>
                            </div>
                        ))
                    }
                </div>
                <div>
                    {this.state.noteForm}
                </div>
            </div>
        )
    }
}