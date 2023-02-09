import { useEffect, useState } from "react";
import { firstAxiosInstance, secondAxiosInstance } from "./axios-test";
import { useSearchParams } from "react-router-dom";

const TestApp = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const session_id = searchParams.get("session_id");

  const getDataHandler = async () => {
    setLoading(true);
    try {
      const response = await firstAxiosInstance.get("");
      setData(response.data);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  const postDataHandler = async () => {
    setLoading(true);
    try {
      const response = await firstAxiosInstance.post("", {
        session_id: "un6beoydda13mcno4kv8lsady27motnz",
      });
      setData(response.data);

      const response2 = await secondAxiosInstance.post("", {
        session_id: "un6beoydda13mcno4kv8lsady27motnz",
      });
      setData(response2.data);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getDataHandler();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No Data</p>;

  return (
    <div>
      <h1>Test App</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={postDataHandler}>Post Data</button>
    </div>
  );
};

export default TestApp;
