import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
// importing LiveChart to app.js
import LiveChart from "./LiveChart";

// Connect to backend server
const socket = io("http://localhost:4000");

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // When connected
    socket.on("connect", () => {
      console.log("Connected to backend");
    });

    // Listen for live data from backend
    socket.on("data", (data) => {
      console.log("Received live data:", data);
      setMessage(data);  // This will update the live message
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <h1>Live Dashboard</h1>
      <p>Live Message: {message ? `Value: ${message.value} @ ${message.time}` : "Waiting for data..."}</p>
      
      {/* Add the LiveChart component here */}
      <LiveChart />
    </div>
  );
}

export default App;
