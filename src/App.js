import React, { useState, useEffect } from "react";
import { firstAxiosInstance, secondAxiosInstance } from "./axios-test";
import { useLocation } from "react-router-dom";
import axios from "axios";

const App = () => {
  const location = useLocation();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = "http://localhost:3000/axios-test";
    }
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://100014.pythonanywhere.com/api/login/",
        {
          username,
          password,
        }
      );
      if (response.data.status === "success") {
        setIsLoggedIn(true);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleSubmit = async () => {
      setLoading(true);

      try {
        const searchParams = new URLSearchParams(location.search);
        const sessionId = searchParams.get("session_id");
        const id = searchParams.get("id");

        if (sessionId) {
          const response = await firstAxiosInstance.get(
            `?session_id=${sessionId}`
          );
          setData({
            sessionId,
            responseData: response.data,
          });
        } else {
          throw new Error("Session ID not found in URL");
        }

        if (sessionId && id) {
          const response = await secondAxiosInstance.get(
            `?session_id=${sessionId}&id=${id}`
          );
          setData({
            sessionId,
            id,
            responseData: response.data,
          });
        } else {
          throw new Error("Session ID and ID not found in URL");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    handleSubmit();
  }, [location.search]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {data && <p>{JSON.stringify(data)}</p>}

      <p>Session ID: {data.sessionId}</p>
      <p>ID: {data.id}</p>
      <p>Response Data: {JSON.stringify(data.responseData)}</p>
      <br />
      <br />
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="passowrd"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default App;
