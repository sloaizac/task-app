import React from "react";
import axios from "axios";
import { isAuthenticated } from "../validation";
import NoteForm from './NoteForm';
import NoteCard from './NoteCard';


export default class NotesList extends React.Component {

    state = {
        notes: [],
        noteForm: false
    }

    componentDidMount() {
        this.getNotes();
    }

    getNotes = async () => {
        const result = await axios.get('http://localhost:4000/notes',
        { params: { 'access-token': localStorage.getItem('access-token') } });

        this.setState(
            {
                notes: result.data,
                noteForm: false
            }
        )
    }

    addNote = async (note_title, note_description) => {     
        const newNote = {
            user_id: localStorage.getItem('user'),
            title: note_title,
            description: note_description
        }
        await axios.post('http://localhost:4000/notes', newNote);
        this.getNotes();
    }

    noteForm() {
        this.setState({
            noteForm: true
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

    onClose = () => {
        this.setState({
            noteForm: false
        })
    }

    render() {

        return (
            <div>
                {
                    (isAuthenticated()) ? (<div className="container-fluid">
                        <div className="row text-general bar pl-4 pr-4">
                            <h1>Notes</h1>
                            <button className="btn btn-success ml-3 m-2" onClick={() => this.noteForm()}>
                                Add note
                            </button>
                        </div>
                        <div className="row m-3">
                            {
                                this.state.notes.map((n) => (
                                    <NoteCard n={n} deleteNote={this.deleteNote} key={n.id} updateNote={this.updateNote} />
                                ))
                            }
                        </div>
                        <NoteForm addNote={this.addNote} show={this.state.noteForm} onClose={this.onClose} />
                    </div>) : (<h3>Please login</h3>)
                }
            </div>
        )
    }
}