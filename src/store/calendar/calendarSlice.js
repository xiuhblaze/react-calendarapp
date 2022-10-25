import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = { 
  _id: new Date().getTime(),
  title: 'Cumpleaños de Naye',
  notes: 'Comprar un regalo',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#0d6efd',
  bgColorSelected: '#0a58ca',
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
      state.activeEvent = action.payload;
    }
  }
});

export const { onSetActiveEvent } = calendarSlice.actions;