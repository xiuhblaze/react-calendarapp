import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent,  } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    
    try {      
      // Success:
      if (calendarEvent.id) {
        // Actualizar   
        await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
      } else {
        // Agregar
        const { data } = await calendarApi.post('/events', calendarEvent);
        console.log({ data });
  
        dispatch(onAddNewEvent({
          ...calendarEvent,
          id: data.evento.id,
          user
        }));
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }
  };

  const startDeletingEvent = async () => {
    try {
      if (activeEvent.id) {
        await calendarApi.delete(`/events/${ activeEvent.id }`);
        dispatch(onDeleteEvent());
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDateEvents(data.eventos);

      dispatch(onLoadEvents(events));
      //console.log({events});
    } catch (error) {
      console.log('Error cargando eventos');
      console.log(error);
    }
  };

  return {
    //* Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //* Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};