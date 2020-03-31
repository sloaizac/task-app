import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';




// Components
import Navigation from './components/Navigation';
import NotesList from './components/NotesList';
import ProjectList from './components/ProjectList';
import Calendar from './components/Calendar2';
import Login from './components/Login';


window.$user = null;


class App extends React.Component {

  render() {
    return <div >
      <Router>
        <Route path='/' component={Navigation}/>
        <Route exact path='/notes' component={NotesList}/>
        <Route path='/projects' component={ProjectList}/>
        <Route path='/calendar' component={Calendar}/>
        <Route path='/login' component={Login}/>
      </Router>
    </div>
  }
}


export default App;
