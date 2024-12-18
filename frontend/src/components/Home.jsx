// import React from 'react';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const Home = () => {
  const [message, setMessage] = useState("");
  
   useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to log in first!");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3001/api/protected-route",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching protected data:", error);
        alert("Failed to fetch protected data. Please login again.");
      }
    };

    fetchData();
  }, []);

  return (
    <div style= {{backgroundImage : "linear-gradient(orange)"}} className="d-flex flex-column justify-content-center align-items-center text-center vh-100">
        <h1>Login Success Page</h1>
      <Link to='/login' className="btn btn-light my-5">Logout</Link>
      <div
      className="d-flex flex-column justify-content-center align-items-center text-center vh-100"
      style={{
        backgroundImage: "linear-gradient(to right, #00c6ff, #0072ff)",
        color: "white",
      }}
    >
      <h1 className="display-4 mb-3">Protected Home Page</h1>
      <p className="lead">{message || "Fetching data..."}</p>
    </div>
    </div>
  )
}

export default Home