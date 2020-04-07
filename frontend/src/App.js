import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css'
// Components
import Navigation from './components/Navigation';
import NotesList from './components/NotesList';
import ProjectList from './components/ProjectList';
import Calendar from './components/Calendar2';
import Login from './components/Login';
import Register from './components/Register';

class App extends React.Component {

  render() {
    return <div >
      
      <Router>
      
        <Navigation />
        <Route exact path='/notes' component={NotesList} />
        <Route path='/projects' component={ProjectList} />
        <Route path='/calendar' component={Calendar} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        
      </Router>
      

    </div>
  }
}


export default App;
