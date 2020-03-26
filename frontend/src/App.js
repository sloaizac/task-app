import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Navigation from './components/Navigation';
import NotesList from './components/NotesList';
import ProjectList from './components/ProjectList';

class App extends React.Component {

  render() {
    return <div >
      <Router>
        <Navigation />
        <Route exact path='/' component={NotesList}/>
        <Route path='/projects' component={ProjectList}/>
      </Router>
    </div>
  }
}


export default App;
