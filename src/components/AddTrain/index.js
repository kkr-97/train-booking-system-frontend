import React, { useState } from "react";
import axios from "axios";

function AddTrain({ adminToken }) {
  const [trainDetails, setTrainDetails] = useState({
    train_id: "",
    train_name: "",
    source: "",
    destination: "",
    total_seats: "",
  });

  const handleChange = (e) => {
    setTrainDetails({ ...trainDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/admin/add_train/",
        trainDetails,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "KI0dbxyn.0SdJq0RBddPu5aVk6pTqfICWzDyZWdNm",
            Authorization: `Token ${adminToken}`,
          },
        }
      );
      alert("Train added successfully");
    } catch (err) {
      alert("Error adding train");
    }
  };

  return (
    <div>
      <h2>Add Train</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="train_id"
          placeholder="Train ID"
          value={trainDetails.train_id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="train_name"
          placeholder="Train Name"
          value={trainDetails.train_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="source"
          placeholder="Source"
          value={trainDetails.source}
          onChange={handleChange}
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={trainDetails.destination}
          onChange={handleChange}
        />
        <input
          type="number"
          name="total_seats"
          placeholder="Total Seats"
          value={trainDetails.total_seats}
          onChange={handleChange}
        />
        <button type="submit">Add Train</button>
      </form>
    </div>
  );
}

export default AddTrain;
