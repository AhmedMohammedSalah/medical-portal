// IMPORT REACT AND ICONS
import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingOverlay from "../../../components/shared/LoadingOverlay";

import {
  getDays,
  isTimeOverlap,
  getHourlyTimesBasedOnRange
} from "./utils";

import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  Info,
  CheckCircle,
  ChevronRightCircle,
} from "lucide-react";
import apiEndpoints from "../../../services/api";


// DEFINE DAYS
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// [SENU]: I know it can be better
const dayMap = {
  Monday: "mon",
  Tuesday: "tue",
  Wednesday: "wed",
  Thursday: "thu",
  Friday: "fri",
  Saturday: "sat",
  Sunday: "sun"
};



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

  // [SENU]:❤️ STATE FOR LOADING------------------
  const [loading, setLoading] = useState(false);
  //----------------------------------------------

  const [doctorId, setDoctorId] = useState(""); // <-- FIXED: track doctor_id in state


  // ON MOUNT:
  useEffect(() => {
    const fetchAppointments = async () => {
        setLoading(true); // Start loading

        try {
            const userResponse = await apiEndpoints.users.getCurrentUser();
            const fetchedDoctorId = userResponse.data.id;
            setDoctorId(fetchedDoctorId); // Store in state

            // Fetch appointments with is_deleted=false
            const response = await axios.get(
                `http://localhost:8000/appointments/?doctor_id=${fetchedDoctorId}&is_deleted=false`
            );
            const appointments = response.data;

            // Transform appointments into frontend format
            const slotsByDay = {};
            appointments.forEach((appt) => {
                const day = Object.keys(dayMap).find((key) => dayMap[key] === appt.day);
                if (!day) return;

                if (!slotsByDay[day]) slotsByDay[day] = [];

                slotsByDay[day].push({
                    id: appt.id,
                    from: appt.from_time,
                    to: appt.to_time,
                });
            });

            setSlots(slotsByDay);
        } catch (err) {
            console.error("Failed to fetch appointments", err);
            showToast("Failed to load appointments");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    fetchAppointments();
  }, []);

  // SHOW TOAST
  const showToast = (message, type = "error") => {
    setToast(message);
    setToastType(type);
    setTimeout(() => setToast(""), 3000);
  };

  // ADD NEW SLOTS
  const addSlot = async () => {
    //[SENU]
    // ❤️ BEGIN LOADING 
    setLoading(true);

    // VARIABLES----------
    let hasOverlap = false;
    const newSlots = { ...slots };
    const appointmentsToCreate = [];
    const selectedDays = useRange ? getDays(fromDay, toDay) : [fromDay];

    // SEGMENT THE TIME RANGE INTO HOURS
    const timeSegments = getHourlyTimesBasedOnRange([fromTime, toTime]);

    // VALIDATION-----------------------------
    if (timeSegments.length === 0) {
      setLoading(false); //[SENU]❤️ STOP LOADING
      return showToast("Time range must be > 0 and divisible by 60 mins");
    }

    // LOOP ON SELECTED DAYS========================================================
    selectedDays.forEach((day) => {
      if (!newSlots[day]) newSlots[day] = [];

      timeSegments.forEach(({ from, to }) => {
        const newSlot = { fromTime: from, toTime: to };

        const overlapping = newSlots[day].find((slot) =>
          isTimeOverlap(slot, newSlot)
        );

        if (overlapping) {
          hasOverlap = true;
        } else {
          appointmentsToCreate.push({
            doctor_id: doctorId,  // <-- use state
            day: dayMap[day],
            from_time: from,
            to_time: to,
          });
        }
      });
    });

    if (hasOverlap) {
      setLoading(false); //[SENU] ❤️ STOP LOADING
      return showToast(`Slot ${fromTime} - ${toTime} overlaps with existing`);
    }

    try {
      console.log("new slots = ", newSlots);
      console.log("appointments to create = ", appointmentsToCreate);

      const response = await axios.post("http://localhost:8000/appointments/", appointmentsToCreate);
      const savedAppointments = response.data;

      savedAppointments.forEach((appt) => {
        const day = Object.keys(dayMap).find((key) => dayMap[key] === appt.day);
        if (!newSlots[day]) newSlots[day] = [];

        newSlots[day].push({
          id: appt.id,
          from: appt.from_time,
          to: appt.to_time,
        });
      });

      console.log("newSlots = ", newSlots);
      setSlots(newSlots);
      setLoading(false); //[SENU]❤️ STOP LOADING
      showToast(`Slot ${fromTime} - ${toTime} added`, "success");

    } catch (err) {
      console.error(err);
      setLoading(false); //[SENU]❤️ STOP LOADING
      showToast("Backend error: could not save appointments");
    }
  };


  // DELETE SLOT
  const removeSlot = async (day, slotIndex) => {
    setLoading(true); // Start loading

    const slotToDelete = slots[day][slotIndex];

    try {
        // Update the appointment to set is_deleted=true
        await axios.patch(`http://localhost:8000/appointments/${slotToDelete.id}/`, {
            is_deleted: true,
        });

        // Update the frontend state
        setSlots((prev) => {
            const updated = { ...prev };
            updated[day] = updated[day].filter((_, i) => i !== slotIndex);
            if (updated[day].length === 0) delete updated[day];
            return updated;
        });

        showToast("Slot removed successfully", "success");
    } catch (error) {
        console.error(error);
        showToast("Failed to remove slot", "error");
    } finally {
        setLoading(false); // Stop loading
    }
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

      {/* ❤️ LOADING */}
      {loading && <LoadingOverlay />}

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
      <div className="overflow-auto border border-green-300 rounded-xl shadow-xl">
        <table className="w-full text-left border-collapse text-lg">
          <thead>
            <tr className="bg-green-100 text-green-800">
              <th className="border border-green-300 px-5 py-4">Day</th>
              <th className="border border-green-300 px-5 py-4">Time Slots</th>
              <th className="border border-green-300 px-5 py-4">Expected Appointments</th>
              <th className="border border-green-300 px-5 py-4 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day} className="bg-white even:bg-gray-50">
                <td className="border border-green-300 px-5 py-4 font-semibold">{day}</td>

                {/* SLOT LIST */}
                <td className="border border-green-300 px-5 py-4">
                  {slots[day]?.length > 0 ? (
                    <div className="space-y-2">
                      {slots[day].map((slot, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-green-50 border border-green-200 px-4 py-3 rounded-lg shadow hover:bg-green-100 transition"
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
