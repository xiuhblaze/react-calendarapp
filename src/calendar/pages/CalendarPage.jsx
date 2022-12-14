import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar } from '../components/Navbar';
import { localizer } from '../../helpers/calendarLocalizer';
import { getMessagesES } from '../../helpers/getMessages';
import { CalendarEvent } from '../components/CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';
import { useEffect } from 'react';

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { user } = useAuthStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const eventStyleGetter = (event, start, end, isSeleced) => {
    //console.log({event, start, end, isSeleced});
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);    
    const style = {
      backgroundColor: isMyEvent ? '#0d6efd' : '#343a40',
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
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    // console.log({ viewChanged: event});
    localStorage.setItem('lastView', event);
    setLastView(event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, [])
  

  return (
    <>
      <Navbar />
      <div className="container">
        <Calendar
          culture='es'
          localizer={localizer}
          events={ events }
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
      </div>
      <CalendarModal />
      <FabDelete />
      <FabAddNew />
    </>
  )
}
