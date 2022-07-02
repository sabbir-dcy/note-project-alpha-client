import React from "react";
import { DayPicker } from "react-day-picker";

const Calender = ({ setDate, date, setCalender }) => {
  const disabledDays = [
    { from: new Date(1600, 0, 1), to: new Date(Date.now() - 86400000) },
  ];

  return (
    <DayPicker
      onDayClick={() => setCalender(false)}
      className="rounded-2xl shadow-md p-4"
      defaultMonth={new Date()}
      disabled={disabledDays}
      mode="single"
      onSelect={setDate}
      date={date}
    />
  );
};

export default Calender;
