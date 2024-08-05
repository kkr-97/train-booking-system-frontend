import React, { useState } from "react";
import axios from "axios";

const TrainList = () => {
  const [trains, setTrains] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const fetchTrains = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/get_train_availability/?source=${source}&destination=${destination}`
      );
      console.log(response.data);
      setTrains(response.data);
    } catch (error) {
      console.error("Error fetching trains:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTrains();
  };

  return (
    <div>
      <h2>Search Trains</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      <h3>Available Trains</h3>
      <ul>
        {trains.map((train) => (
          <li key={train.id}>
            {train.train_name} - Seats Available: {train.total_seats}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainList;
