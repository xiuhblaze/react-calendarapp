import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = { 
  _id: new Date().getTime(),
  title: 'Cumpleaños de Naye',
  notes: 'Comprar un regalo',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#0d6efd',
  bgColorSelected: '#ffc107',
  user: {
    _id: '1456',
    name: 'Adrian'
  }
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [
      tempEvent,
    ],
    activeEvent: null
  },
  reducers: {
    onSetActiveEvent: (state, action) => {
      // state.events = state.events.map(event => {
      //   if (event._id === action.payload._id) {
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
        if (event._id === action.payload._id) {
          return action.payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) { // Si hay evento activo, eliminarlo, sino, no hacer nada --no poner un return
        state.events = state.events.filter(event => event._id !== state.activeEvent._id);
        state.activeEvent = null;
      }
    },
  }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;