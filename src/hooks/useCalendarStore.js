import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO: Solicitar del backend

    // Success:
    if (calendarEvent._id) {
      // Actualizar   
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // Agregar
      dispatch(onAddNewEvent({
        ...calendarEvent,
        _id: new Date().getTime()
      }));
    }
  };

  const startDeletingEvent = async () => {
    // TODO: Eliminar del backend
    dispatch(onDeleteEvent());
  };

  return {
    //* Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //* Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent
  };
};