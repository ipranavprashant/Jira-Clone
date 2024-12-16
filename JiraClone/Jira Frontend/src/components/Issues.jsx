import IssuesCard from "./IssuesCard";
import axios from "axios";
import { useState, useEffect } from "react";

const Issues = () => {
  const [issues, setIssues] = useState([]);

  const fetchIssues = async () => {
    const response = await axios.get("http://localhost:4010/fetch-all-issues");

    setIssues(response.data.Issues);
    console.log(issues);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <>
      <div className="p-4 flex">
        {issues.map((element) => {
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
        })}
      </div>
    </>
  );
};

export default Issues;
