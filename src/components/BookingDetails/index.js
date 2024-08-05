import { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const authToken = Cookie.get("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/booking-details/",
          {
            headers: { Authorization: `Token ${authToken}` },
          }
        );
        console.log(response.data);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [authToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Booking Details</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <h3>Train Number: {booking.train}</h3>
              <p>Date: {booking.booking_time}</p>
              <p>Seats: {booking.seats_booked}</p>
              <p>Status: Booked</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingDetails;
