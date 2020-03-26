import React from "react";
import axios from "axios";
import NoteForm from './NoteForm';
import NoteCard from './NoteCard';


export default class NotesList extends React.Component {

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
        await axios.delete('http://localhost:4000/notes/' + id);
        this.getNotes();
    }

    updateNote = async (id, newNote) => {
        await axios.put('http://localhost:4000/notes/' + id, newNote);
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
                            <NoteCard n={n} deleteNote={this.deleteNote} key={n.id} updateNote={this.updateNote} />
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