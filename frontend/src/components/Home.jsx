import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert"; // Correct import from react-bootstrap

const Home = () => {
  const styles = {
    container: {
      padding: "2rem",
      maxWidth: "800px",
      margin: "0 auto",
    },
  };

  const [message, setMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(true); // Corrected state name (alertVisible)

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
      }
    };
    fetchData();
    const timer = setTimeout(() => {
      setAlertVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{ backgroundImage: "linear-gradient(orange)" }}
      className="d-flex flex-column justify-content-center align-items-center text-center vh-100"
    >
      <h1>Login Success Page</h1>
      <div className="d-flex justify-content-space-between">
        <Link>Admin</Link>
        <Link to="/home/about">About Us</Link>
        <Link to="/home/contact">Contact</Link>
        <Link to="/login">Logout</Link>
      </div>

      {/* Conditionally show the Alert */}
      {alertVisible && (
        <Alert severity="success">This is a success Alert.</Alert>
      )}

      <div
        className="d-flex flex-column justify-content-center align-items-center text-center vh-100"
        style={{
          backgroundImage: "linear-gradient(to right, #00c6ff, #0072ff)",
          color: "white",
        }}
      >
        <div style={styles.container}>
          <h1>Welcome to Our Website</h1>
          <p>This is the home page of our application.</p>
        </div>
        <p className="lead">{message || "Fetching data..."}</p>
      </div>
    </div>
  );
};

export default Home;
