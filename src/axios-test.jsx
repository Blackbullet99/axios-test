import axios from "axios";

const firstAxiosInstance = axios.create({
  baseURL: "https://100014.pythonanywhere.com/api/userinfo/",
});

const secondAxiosInstance = axios.create({
  baseURL: "https://100093.pythonanywhere.com/api/userinfo/",
});

export { firstAxiosInstance, secondAxiosInstance };

// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const firstAxiosInstance = axios.create({
//   baseURL: "https://100014.pythonanywhere.com/api/userinfo/",
// });

// const secondAxiosInstance = axios.create({
//   baseURL: "https://100093.pythonanywhere.com/api/userinfo/",
// });

// const App = () => {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const sessionId = params.get("session_id");
//   const id = params.get("id");

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       let axiosInstance = firstAxiosInstance;
//       if (id) {
//         axiosInstance = secondAxiosInstance;
//       }
//       const response = await axiosInstance.post(
//         `?session_id=${sessionId}&id=${id}`,
//         {}
//       );
//       setData(response.data);
//       setLoading(false);
//     };
//     if (sessionId) {
//       fetchData();
//     }
//   }, [sessionId, id]);

//   return (
//     <div>
//       {loading ? (
//         <div>Loading...</div>
//       ) : data ? (
//         <div>Data: {JSON.stringify(data)}</div>
//       ) : (
//         <div>No data available</div>
//       )}
//     </div>
//   );
// };

// export default App;

