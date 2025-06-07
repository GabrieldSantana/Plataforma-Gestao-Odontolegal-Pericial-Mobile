import { useState } from 'react';
import { Platform } from 'react-native';

type Mode = 'date' | 'time';

export function useDateTimePicker(initialDate: Date) {
  const [date, setDate] = useState(initialDate);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<Mode>('date');

  function showPicker(newMode: Mode) {
    setMode(newMode);
    setShow(true);
  }

  function onChange(event: any, selectedDate?: Date) {
    if (event.type === 'dismissed') {
      setShow(false);
      return;
    }

    if (mode === 'date') {
      const current = selectedDate || date;
      const newDate = new Date(
        current.getFullYear(),
        current.getMonth(),
        current.getDate(),
        date.getHours(),
        date.getMinutes()
      );
      setDate(newDate);
      setMode('time');
      setShow(true);
    } else {
      const current = selectedDate || date;
      const newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        current.getHours(),
        current.getMinutes()
      );
      setDate(newDate);
      setShow(false);
    }
  }

  return { date, show, mode, showPicker, onChange };
}
