import React from "react";
import moment from "moment";
import { Calendar, momentLocalizer, Views} from 'react-big-calendar';
import ModalEvent from "./ModalEvent";
import "react-big-calendar/lib/css/react-big-calendar.css";

require('moment/locale/es');

const localizer = momentLocalizer(moment);

//array de eventos
const eventsList = [{
  title: "Event test",
  start: new Date('2020-03-29 10:00:00'),
  end: new Date('2020-03-29 11:30:00')
}]

const style = {
  height: "700px"
}


export default class Calendar2 extends React.Component {

  state = {
    events: eventsList,
    form: false
  }

  handleSelect = () => {
    this.setState({
      form: true
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
        <ModalEvent show={this.state.form} onClose={this.onClose} >Hello</ModalEvent>
      </div>);
  }

}