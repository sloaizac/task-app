import React from "react";
import moment from "moment";
import axios from "axios";
import { Calendar, momentLocalizer, Views} from 'react-big-calendar';
import ModalEvent from "./ModalEvent";
import "react-big-calendar/lib/css/react-big-calendar.css";

require('moment/locale/es');

const localizer = momentLocalizer(moment);

const style = {
  height: "700px"
}


export default class Calendar2 extends React.Component {

  state = {
    id: false,
    events: [],
    form: false,
    start: moment(),
    end: moment()
  }

  /*
  getEvents = async () => {
    const res =  await axios.get("http://localhost:4000/events");
    const a = []
    res.data.map((e) => {   
      console.log(e.start);
      
      return (a.push({
        title: e.title,
        start: new Date(e.start),
        end: new Date(e.end)
      }
      )
      )
    })

    this.setState({
      events: a
    })
  }*/

  addEvent = async (newEvent) =>{
      //await axios.post("http://localhost:4000/events", newEvent);
      const n =  this.state.events;
      n.push(newEvent);
      this.setState({
        events: n
      })
      this.onClose();
      //this.getEvents();
  }

  handleSelect = ({start, end}) => {
    this.setState({
      id: !this.state.id,
      form: true,
      start: moment(start),
      end: moment(end)
    })
  }

  onClose = () => {
    this.setState({
      form: false
    })
  }

  render() {

    return (
      <div className="m-4">
        <div style={style} className="bigCalendar-container">
          <Calendar
            selectable
            defaultView={Views.WEEK}
            scrollToTime={new Date(1970, 1, 1, 5)}
            localizer={localizer}
            events={this.state.events}
            startAccessor="start"
            endAccessor="end"
            onSelectSlot={this.handleSelect}
          />
        </div>
        <ModalEvent show={this.state.form} onClose={this.onClose} start={this.state.start} 
        end={this.state.end} addEvent={this.addEvent} id={this.state.id} >Hello</ModalEvent>
      </div>);
  }

}