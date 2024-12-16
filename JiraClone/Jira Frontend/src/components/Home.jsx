import { jwtDecode } from "jwt-decode";
import axios from "axios";

import { useState, useEffect } from "react";

const Home = () => {
  const [employeeData, setEmployeeData] = useState(null);

  const fetchEmployeeDetails = async () => {
    const token = localStorage.getItem("Authorization");
    const decodedToken = jwtDecode(token);
    const employeeId = decodedToken.sub;

    const response = await axios.get(
      `http://localhost:4010/fetch-employee/${employeeId}`
    );
    setEmployeeData(response.data);
    console.log(employeeData);
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  return (
    <>
      <div>
        Welcome {employeeData?.employee?.employeename || "Guest"} to this jira
        clone!
      </div>
    </>
  );
};

export default Home;
