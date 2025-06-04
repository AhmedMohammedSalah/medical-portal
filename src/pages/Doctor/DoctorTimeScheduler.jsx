// IMPORT REACT AND ICONS
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  Info,
  CheckCircle,
  ChevronRightCircle,
} from "lucide-react";

// DEFINE DAYS
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// GET DAYS IN RANGE
function getDays(fromDay, toDay) {
  const fromIndex = days.indexOf(fromDay);
  const toIndex = days.indexOf(toDay);
  return days.slice(fromIndex, toIndex + 1);
}

// TIME STRING TO MINUTES
const toMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

// CHECK IF TIMES OVERLAP
function isTimeOverlap(existSlot, newSlot) {
  const existingFrom = toMinutes(existSlot.from);
  const existingTo = toMinutes(existSlot.to);
  const newFrom = toMinutes(newSlot.fromTime);
  const newTo = toMinutes(newSlot.toTime);
  return newFrom < existingTo && newTo > existingFrom;
}

// GET HOURLY TIMES (EX: 09:00 TO 12:00 → 3 SLOTS)
function getHourlyTimesBasedOnRange([fromTime, toTime]) {
  const result = [];
  const toTimeString = (minutes) => {
    const h = Math.floor(minutes / 60).toString().padStart(2, "0");
    const m = (minutes % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
  };
  const start = toMinutes(fromTime);
  const end = toMinutes(toTime);
  for (let min = start; min < end; min += 60) {
    result.push({ from: toTimeString(min), to: toTimeString(min + 60) });
  }
  return result;
}

// MAIN COMPONENT
export default function WeeklyScheduler() {
  // STATE
  const [slots, setSlots] = useState({});
  const [useRange, setUseRange] = useState(false);
  const [fromDay, setFromDay] = useState("Monday");
  const [toDay, setToDay] = useState("Monday");
  const [fromTime, setFromTime] = useState("09:00");
  const [toTime, setToTime] = useState("17:00");
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("error");

  // SHOW TOAST
  const showToast = (message, type = "error") => {
    setToast(message);
    setToastType(type);
    setTimeout(() => setToast(""), 3000);
  };

  // ADD NEW SLOT
  const addSlot = () => {
    const newSlots = { ...slots };
    const duration = toMinutes(toTime) - toMinutes(fromTime);

    if (duration <= 0 || duration % 60 !== 0) {
      return showToast("Time range must be > 0 and divisible by 60 mins");
    }

    const selectedDays = useRange ? getDays(fromDay, toDay) : [fromDay];
    let hasOverlap = false;

    selectedDays.forEach((day) => {
      if (!newSlots[day]) newSlots[day] = [];
      const newSlot = { fromTime, toTime };
      const overlapping = newSlots[day].find((slot) => isTimeOverlap(slot, newSlot));
      if (overlapping) {
        hasOverlap = true;
      } else {
        newSlots[day].push({ from: fromTime, to: toTime });
      }
    });

    if (hasOverlap) {
      return showToast(`Slot ${fromTime} - ${toTime} overlaps with existing`);
    }

    setSlots(newSlots);
    showToast(`Slot ${fromTime} - ${toTime} added`, "success");
  };

  // DELETE SLOT
  const removeSlot = (day, slotIndex) => {
    setSlots((prev) => {
      const updated = { ...prev };
      updated[day] = updated[day].filter((_, i) => i !== slotIndex);
      if (updated[day].length === 0) delete updated[day];
      return updated;
    });
  };

  // CALCULATE TOTAL APPOINTMENTS IN ONE DAY
  const getTotalAppointments = (day) => {
    const slotsInDay = slots[day] || [];
    return slotsInDay.reduce((acc, slot) => {
      const count = getHourlyTimesBasedOnRange([slot.from, slot.to]).length;
      return acc + count;
    }, 0);
  };

  // UI
  return (
    <div className="p-10 max-w-6xl mx-auto text-lg">
      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-6 text-green-700 flex items-center gap-3">
        <Calendar className="w-8 h-8" />
        Weekly Scheduler
      </h1>

      {/* TOAST */}
      {toast && (
        <div
          className={`mb-5 p-4 rounded-lg shadow flex items-center gap-3 text-lg ${
            toastType === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {toastType === "success" ? <CheckCircle /> : <Info />}
          <span>{toast}</span>
        </div>
      )}

      {/* INPUT SECTION */}
      <div className="flex flex-wrap items-end gap-4 mb-10 bg-green-50 p-6 rounded-lg shadow-inner">
        {/* FROM DAY */}
        <div>
          <label className="block font-semibold mb-2">
            {useRange ? "From Day" : "Day"}
          </label>
          <select
            className="border border-gray-300 px-4 py-3 rounded-lg w-40 bg-white"
            value={fromDay}
            onChange={(e) => setFromDay(e.target.value)}
          >
            {days.map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>
        </div>

        {/* TO DAY (IF RANGE CHECKED) */}
        {useRange && (
          <div>
            <label className="block font-semibold mb-2">To Day</label>
            <select
              className="border border-gray-300 px-4 py-3 rounded-lg w-40 bg-white"
              value={toDay}
              onChange={(e) => setToDay(e.target.value)}
            >
              {days.map((day) => (
                <option key={day}>{day}</option>
              ))}
            </select>
          </div>
        )}

        {/* FROM TIME */}
        <div>
          <label className="block font-semibold mb-2 flex items-center gap-1">
            <Clock className="w-5 h-5" /> From Time
          </label>
          <input
            type="time"
            className="border border-gray-300 px-4 py-3 rounded-lg w-40"
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
          />
        </div>

        {/* TO TIME */}
        <div>
          <label className="block font-semibold mb-2 flex items-center gap-1">
            <Clock className="w-5 h-5" /> To Time
          </label>
          <input
            type="time"
            className="border border-gray-300 px-4 py-3 rounded-lg w-40"
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
          />
        </div>

        {/* ADD BUTTON */}
        <button
          onClick={addSlot}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-lg transition duration-200"
        >
          <Plus /> Add Slot
        </button>

        {/* RANGE CHECKBOX */}
        <div className="flex items-center gap-2 ml-auto">
          <input
            type="checkbox"
            checked={useRange}
            onChange={(e) => setUseRange(e.target.checked)}
            className="accent-green-600 w-5 h-5"
          />
          <label className="font-semibold">Range?</label>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-auto border border-gray-300 rounded-xl shadow-xl">
        <table className="w-full text-left border-collapse text-lg">
          <thead>
            <tr className="bg-green-100 text-green-800">
              <th className="border border-gray-300 px-5 py-4">Day</th>
              <th className="border border-gray-300 px-5 py-4">Time Slots</th>
              <th className="border border-gray-300 px-5 py-4">Expected Appointments</th>
              <th className="border border-gray-300 px-5 py-4 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day} className="bg-white even:bg-gray-50">
                <td className="border border-gray-300 px-5 py-4 font-semibold">{day}</td>

                {/* SLOT LIST */}
                <td className="border border-gray-300 px-5 py-4">
                  {slots[day]?.length > 0 ? (
                    <div className="space-y-2">
                      {slots[day].map((slot, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-green-50 border border-gray-200 px-4 py-3 rounded-lg shadow hover:bg-green-100 transition"
                        >
                          <div className="flex items-center gap-2 text-green-700 font-semibold">
                            <ChevronRightCircle className="w-5 h-5" />
                            {slot.from} - {slot.to}
                          </div>
                          <button
                            onClick={() => removeSlot(day, index)}
                            className="text-red-600 hover:text-red-800 transition"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400">No slots</span>
                  )}
                </td>

                {/* APPOINTMENTS PER SLOT */}
                <td className="border border-gray-300 px-5 py-4">
                  {slots[day]?.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {slots[day].map((slot, index) => {
                        const count = getHourlyTimesBasedOnRange([slot.from, slot.to]).length;
                        return (
                          <li key={index}>{count} appointment{count > 1 ? "s" : ""}</li>
                        );
                      })}
                    </ul>
                  ) : (
                    <span className="text-gray-400">No appointments</span>
                  )}
                </td>

                {/* TOTAL APPOINTMENTS */}
                <td className="border border-gray-300 px-5 py-4 font-bold text-green-700 text-center">
                  {getTotalAppointments(day)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
