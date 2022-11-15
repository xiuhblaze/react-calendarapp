import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

// const tempEvent = { 
//   id: new Date().getTime(),
//   title: 'Cumpleaños de Naye',
//   notes: 'Comprar un regalo',
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgColor: '#0d6efd',
//   bgColorSelected: '#ffc107',
//   user: {
//     id: '1456',
//     name: 'Adrian'
//   }
// }

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
  },
  reducers: {
    onSetActiveEvent: (state, action) => {
      // state.events = state.events.map(event => {
      //   if (event.id === action.payload.id) {
      //     return {
      //       ...action.payload,

      //     }
      //   }
      //   return event
      // });
      state.activeEvent = action.payload;
    },
    onAddNewEvent: (state, action) => {
      state.events.push(action.payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, action) => {
      state.events = state.events.map(event => {
        if (event.id === action.payload.id) {
          return action.payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) { // Si hay evento activo, eliminarlo, sino, no hacer nada --no poner un return
        state.events = state.events.filter(event => event.id !== state.activeEvent.id);
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, action) => {
      state.isLoadingEvents = false;
      // state.events = action.payload;
      action.payload.forEach(event => {
        const exist = state.events.some(dbEvent => dbEvent.id === event.id);
        if (!exist) {
          state.events.push(event);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  }
});

export const { 
  onSetActiveEvent, 
  onAddNewEvent, 
  onUpdateEvent, 
  onDeleteEvent, 
  onLoadEvents, 
  onLogoutCalendar 
} = calendarSlice.actions;