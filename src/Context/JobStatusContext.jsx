import React, { createContext, useContext, useEffect, useState } from "react";

const JobContext = createContext();
export const useJobStatus = () => useContext(JobContext);

export const JobStatusProvider = ({ children }) => {
  const [jobStatus, setJobStatus] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(
          "https://stocksquare1.runasp.net/api/SystemCode/GetByType?type=jobStatus"
        );
        if (res.ok) {
          const data = await res.json();
          setJobStatus(data);
          console.log(jobStatus);
        } else {
          console.log("error in response");
        }
      } catch (e) {
        console.log("dont send");
      }
    };

    fetchStatus();
  }, []);

  return (
    <JobContext.Provider value={jobStatus}>{children}</JobContext.Provider>
  );
};
