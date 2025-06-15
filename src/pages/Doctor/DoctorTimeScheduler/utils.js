

// DEFINE DAYS
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];



// GET DAYS IN RANGE
export function getDays(fromDay, toDay) {
    const fromIndex = days.indexOf(fromDay);
    const toIndex = days.indexOf(toDay);
    return days.slice(fromIndex, toIndex + 1);
  }



// TIME STRING TO MINUTES
export const toMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

// CHECK IF TIMES OVERLAP
export function isTimeOverlap(existSlot, newSlot) {
  const existingFrom = toMinutes(existSlot.from);
  const existingTo = toMinutes(existSlot.to);
  const newFrom = toMinutes(newSlot.fromTime);
  const newTo = toMinutes(newSlot.toTime);
  return newFrom < existingTo && newTo > existingFrom;
}

// GET HOURLY TIMES (EX: 09:00 TO 12:00 → 3 SLOTS)
export function getHourlyTimesBasedOnRange([fromTime, toTime]) {
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



