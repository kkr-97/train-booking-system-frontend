import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";

const BookSeat = () => {
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState();
  const [seatsRequested, setSeatsRequested] = useState(0);
  const [availableSeats, setAvailableSeats] = useState(0);
  const authToken = Cookie.get("token");

  useEffect(() => {
    if (selectedTrain) {
      const trainInd = trains.findIndex(
        (eachItem) => eachItem.train_id === selectedTrain
      );
      setAvailableSeats(trains[trainInd].total_seats);
    }

    const fetchTrains = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/get_train_availability/"
        );
        setTrains(response.data);
      } catch (error) {
        console.error("Error fetching trains:", error);
      }
    };

    fetchTrains();
  }, [selectedTrain, trains]);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/book-seat/",
        {
          train_id: selectedTrain,
          seats_requested: seatsRequested,
        },
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      console.log("Booking successful:", response.data);
      alert("Booking successful");
    } catch (error) {
      console.error("Error booking seat:", error);
      alert("Failed to book seats");
    }
  };

  return (
    <div>
      <h2>Book Seats</h2>
      <form onSubmit={handleBooking}>
        <select
          value={selectedTrain}
          onChange={(e) => setSelectedTrain(e.target.value)}
          required
        >
          <option value="">Select Train</option>
          {trains.map((train) => (
            <option key={train.train_id} value={train.train_id}>
              {train.name} ({train.source} - {train.destination})
            </option>
          ))}
        </select>
        {selectedTrain && <p>Available seats: {availableSeats}</p>}
        <input
          type="number"
          value={seatsRequested}
          onChange={(e) => setSeatsRequested(e.target.value)}
          placeholder="Number of Seats"
          required
        />
        <button type="submit">Book Seats</button>
      </form>
    </div>
  );
};

export default BookSeat;
