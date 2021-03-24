import fetch from 'node-fetch';

//ran out of time here :)
const checkIfBooked = async (id: string, startDate: Date, endDate: Date) => {
  startDate.toISOString
  return await fetch(`http://booking-service:7001/api/cars/${id}/isBooked`, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify({ startDate, endDate }) })
    .then(res => res.json())
}

export const bookingService = { checkIfBooked }