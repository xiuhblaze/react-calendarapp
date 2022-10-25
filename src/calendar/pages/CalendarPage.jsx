import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';

import { Navbar } from '../components/Navbar';
import { localizer } from '../../helpers/calendarLocalizer';
import { getMessagesES } from '../../helpers/getMessages';
import { CalendarEvent } from '../components/CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore } from '../../hooks';

const eventsList = [
  { 
    title: 'Cumpleaños de Naye',
    notes: 'Comprar un regalo',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#0d6efd',
    bgColorSelected: '#0a58ca',
    user: {
      uid: '1456',
      name: 'Adrian'
    }
  }
];

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  const eventStyleGetter = (event, start, end, isSeleced) => {
    //console.log({event, start, end, isSeleced});
    const style = {
      backgroundColor: '#0d6efd',
      borderRadius: '4px',
      color: '#fff'
    };

    return {
      style
    }
  };

  const onDoubleClick = (event) => {
    // console.log({ doubleClick: event});
    openDateModal();
  };

  const onSelect = (event) => {
    console.log({ click: event});
  };

  const onViewChanged = (event) => {
    console.log({ viewChanged: event});
    localStorage.setItem('lastView', event);
    setLastView(event);
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={eventsList}
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 100px)' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{ 
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />
      <CalendarModal />
    </>
  )
}
