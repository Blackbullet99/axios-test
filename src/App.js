import React, { useState, useEffect } from "react";
import { firstAxiosInstance, secondAxiosInstance } from "./axios-test";

const App = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleSubmit = async () => {
      // event.preventDefault();

      setLoading(true);

      try {
        const getData = await firstAxiosInstance.get("");
        console.log(getData);
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await firstAxiosInstance.post("", {
          message: "its working",
        });

        console.log(response.data);

        const url = new URL(response.request.responseURL);
        const sessionId = url.searchParams.get("session_id");

        console.log(sessionId);
        if (sessionId) {
          setData({
            sessionId,
            responseData: response.data,
          });
        } else {
          throw new Error("Session ID not found in URL");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    handleSubmit();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {data.sessionId && (
        <div>
          <p>Session ID: {data.sessionId}</p>
          <p>Response data: {JSON.stringify(data.responseData)}</p>
        </div>
      )}
    </div>
  );
};

export default App;
