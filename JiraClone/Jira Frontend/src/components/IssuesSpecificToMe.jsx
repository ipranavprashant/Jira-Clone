import IssuesCard from "./IssuesCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const IssuesSpecificToMe = () => {
  const [issues, setIssues] = useState([]);

  const fetchIssues = async (id) => {
    const response = await axios.get(
      `http://localhost:4010/employee-specific-issues/${id}`
    );

    setIssues(response?.data?.Issues);
  };

  const fetchUserId = () => {
    const token = localStorage.getItem("Authorization");
    const decodedToken = jwtDecode(token);

    const id = decodedToken.sub;
    fetchIssues(id);
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  return (
    <>
      <div className="p-4 flex">
        {issues.length === 0 ? (
          <p>No employee specific issues found</p>
        ) : (
          issues.map((element) => {
            return (
              <IssuesCard
                key={element._id}
                issueId={element._id}
                title={element.title}
                description={element.description}
                employee={element.employee}
                severity={element.severity}
                status={element.status}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default IssuesSpecificToMe;
