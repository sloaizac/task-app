import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Navigation from './components/Navigation';
import NotesList from './components/NotesList';
import ProjectList from './components/ProjectList';
import Calendar from './components/Calendar2';

class App extends React.Component {

  render() {
    return <div >
      <Router>
        <Navigation />
        <Route exact path='/' component={NotesList}/>
        <Route path='/projects' component={ProjectList}/>
        <Route path='/calendar' component={Calendar}/>
      </Router>
    </div>
  }
}


export default App;
