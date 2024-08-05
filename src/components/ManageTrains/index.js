import React, { useState, useEffect } from "react";
import axios from "axios";

function ManageTrains({ adminToken }) {
  const [trains, setTrains] = useState([]);
  console.log(adminToken);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/get_train_availability/",
          {
            headers: { "X-API-KEY": adminToken },
          }
        );
        setTrains(response.data);
      } catch (err) {
        console.error("Error fetching trains", err);
      }
    };
    fetchTrains();
  }, [adminToken]);

  const handleDelete = async (trainId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/admin/delete_train/${trainId}/`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "KI0dbxyn.0SdJq0RBddPu5aVk6pTqfICWzDyZWdNm",
            Authorization: `Token ${adminToken}`,
          },
        }
      );
      setTrains(trains.filter((train) => train.id !== trainId));
    } catch (err) {
      console.error("Error deleting train", err);
    }
  };

  return (
    <div>
      <h2>Manage Trains</h2>
      <ul>
        {trains.map((train) => (
          <li key={train.id}>
            {train.train_name} ({train.source} to {train.destination}) - Seats:
            {train.total_seats}
            <button onClick={() => handleDelete(train.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageTrains;
