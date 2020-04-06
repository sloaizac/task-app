import React from "react";
import moment from "moment";
import axios from "axios";
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { isAuthenticated } from "../validation";
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
    eventId: "",
    edit: false,
    title: "",
    events: [],
    form: false,
    start: moment(),
    end: moment()
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents = async () => {
    const res = await axios.get("http://localhost:4000/events",
      { params: { 'access-token': localStorage.getItem('access-token') } });
    const a = []
    res.data.map((e) => {   
     return (a.push({
        id: e.id,
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
  }

  addEvent = async (newEvent) => {
    if (this.state.edit) {
      await axios.put("http://localhost:4000/events/" + newEvent.eventId, newEvent)
        .then(res => {
          this.onClose();
          this.getEvents();
        })
        .catch(err => {   
          console.log(err);
        })
    }else {
      await axios.post("http://localhost:4000/events", newEvent)
        .then(res => {
          this.onClose();
          this.getEvents();
        })
        .catch(err => {
          console.log(err);
        })
    }


  }

  handleSelectEvent = ({id, title, start, end }) => {
    this.setState({
      id: !this.state.id,
      eventId: id,
      title: title,
      edit: true,
      form: true,
      start: moment(start),
      end: moment(end)
    })
  }


  handleSelect = ({ start, end }) => {
    this.setState({
      id: !this.state.id,
      title: "",
      edit: false,
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
        {
          (isAuthenticated()) ? (<div>

            <div style={style} className="bigCalendar-container">
              <Calendar
                selectable
                defaultView={Views.WEEK}
                scrollToTime={new Date(1970, 1, 1, 5)}
                localizer={localizer}
                events={this.state.events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={event => this.handleSelectEvent(event)}
                onSelectSlot={this.handleSelect}
              />
            </div>
            <ModalEvent show={this.state.form} onClose={this.onClose} title={this.state.title} start={this.state.start}
              end={this.state.end} addEvent={this.addEvent} id={this.state.id} eventId={this.state.eventId} >Hello</ModalEvent>
          </div>) : (<h3>Please login</h3>)
        }
      </div>);
  }

}