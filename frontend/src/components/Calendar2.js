import React from "react";
import moment from "moment";
import {Calendar, momentLocalizer} from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";

require('moment/locale/es');

const localizer = momentLocalizer(moment);

//array de eventos
const eventsList= [{
    title: "today",
    start: new Date('2019-05-05 10:22:00'),
    end: new Date('2019-05-05 10:42:00')
  },
  {
    title: "string",
     start: new Date('2019-05-05 12:22:00'),
    end: new Date('2019-05-05 13:42:00')
  }]

  const style = {
      height: "600px"
  }

  export default class Calendar2 extends React.Component{

    render(){
        return (
            <div style={style} className="bigCalendar-container">
                <Calendar
                  localizer={localizer}
                  events={eventsList}
                  startAccessor="start"
                  endAccessor="end"
                />
              </div>);
    }

  }