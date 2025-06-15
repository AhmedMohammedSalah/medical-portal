import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/shared/sidebar';

export default function BookAppointmentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const doctor = state?.doctor;
  const slot = state?.slot;

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showAlert, setShowAlert] = useState(false); // ✅ added state

  useEffect(() => {
    if (slot) {
      const [day, timeStr] = slot.split(' ');
      const parsedTime = convertTo24Hour(timeStr + ' ' + slot.split(' ')[2]);
      setTime(parsedTime);
      const dateOfNextDay = getNextDateByDayName(day);
      setDate(dateOfNextDay.toISOString().split('T')[0]);
    }
  }, [slot]);

  if (!doctor || !slot) {
    return (
      <div className="text-center mt-20 text-red-600">
        <p>Error: Booking data is missing.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="flex-grow max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
        {showAlert && (
          <div className="mb-4 p-4 rounded bg-green-100 border border-green-300 text-green-800 animate-fade-in">
            ✅ Booked <strong>{doctor.name}</strong> on <strong>{date}</strong> at <strong>{time}</strong>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4 text-blue-700">Book with {doctor.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Date</label>
            <input
              type="date"
              required
              className="w-full border px-3 py-2 rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Time</label>
            <input
              type="time"
              required
              className="w-full border px-3 py-2 rounded"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function convertTo24Hour(timeStr) {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');

  if (modifier === 'PM' && hours !== '12') {
    hours = String(parseInt(hours, 10) + 12);
  }
  if (modifier === 'AM' && hours === '12') {
    hours = '00';
  }
  return `${hours.padStart(2, '0')}:${minutes}`;
}

function getNextDateByDayName(dayName) {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const todayDay = today.getDay();
  const targetDay = dayNames.indexOf(dayName);

  let delta = (targetDay - todayDay + 7) % 7;
  if (delta === 0) delta = 7;

  const result = new Date(today);
  result.setDate(today.getDate() + delta);
  return result;
}
