/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const IssuesCard = ({
  issueId,
  title,
  description,
  severity,
  employee,
  status,
}) => {
  const [name, setName] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [data, setData] = useState({
    title: title,
    description: description,
    severity: severity,
    status: status,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("handle change was invoked by: ", name);

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const fetchEmployeeName = async (employeeId) => {
    const response = await axios.get(
      `http://localhost:4010/fetch-employee/${employeeId}`
    );

    console.log(response?.data?.employee?.employeename);
    setName(response?.data?.employee?.employeename);
  };

  const editOption = () => {
    const token = localStorage.getItem("Authorization");
    const decodedToken = jwtDecode(token);

    if (employee === decodedToken.sub) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    fetchEmployeeName(employee);
    editOption();
  }, []);

  const handleEdit = async () => {
    setIsEditMode(true);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("Authorization");
    const decodedToken = jwtDecode(token);

    const updatedData = {
      title: data.title,
      description: data.description,
      severity: data.severity,
      employee: decodedToken.sub,
      status: data.status,
    };

    // console.log(decodedToken.sub);
    // console.log(issueId);
    console.log(updatedData.title);

    const response = await axios.put(
      `http://localhost:4010/update-issue/${issueId}`,
      { updatedData }
      //   {
      //     withCredentials: true,
      //   }
    );

    console.log(response);

    if (response.status === 500) {
      alert("Error updating the issue");
    } else {
      alert("Issue updated successfully!");
    }
  };

  return (
    <>
      {/*  */}
      {/* <div className="p-8 flex justify-center"> */}
      {isEditMode ? (
        <>
          <div className="flex flex-col bg-slate-100 space-y-3 p-8 w-96 items-center">
            <div className="space-x-4 flex items-center flex-col">
              <label htmlFor="title" className="text-2xl">
                Title:
              </label>
              <input
                type="text"
                id="title"
                placeholder="Issue title"
                value={data.title}
                name="title"
                onChange={handleChange}
                className="w-72 h-12 rounded-md placeholder:text-center p-4"
              ></input>
            </div>

            <div className="space-x-4 flex items-center flex-col">
              <label htmlFor="description" className="text-2xl">
                Description:
              </label>
              <input
                type="text"
                id="description"
                placeholder="Issue description"
                value={data.description}
                name="description"
                onChange={handleChange}
                className="w-72 h-12 p-4 rounded-md placeholder:text-center"
              ></input>
            </div>

            <div className="space-x-4 flex items-center flex-col">
              <label htmlFor="severity" className="text-2xl">
                Severity:
              </label>
              <input
                type="text"
                id="severity"
                placeholder="(High, Med, Low, No)"
                value={data.severity}
                name="severity"
                onChange={handleChange}
                className="w-72 h-12 p-4 rounded-md placeholder:text-center"
              ></input>
            </div>

            <div className="space-x-4 flex items-center flex-col">
              <label htmlFor="status" className="text-2xl">
                Status:
              </label>
              <input
                type="text"
                id="status"
                placeholder="Todo, In Process, In Review, Done"
                value={data.status}
                name="status"
                onChange={handleChange}
                className="w-72 h-12 p-4 rounded-md placeholder:text-center"
              ></input>
            </div>

            <button
              onClick={handleUpdate}
              className="rounded bg-gray-400 p-3 w-24"
            >
              Update Issue
            </button>
          </div>
        </>
      ) : (
        <>
          {/*  */}
          <div className="bg-slate-500 w-72 h-72 p-4 m-6">
            <p>{title}</p>
            <p>{description}</p>
            <p>{severity}</p>
            <p>{name}</p>
            <p>{status}</p>
            {showButton && <button onClick={handleEdit}>Edit</button>}
          </div>
        </>
      )}
    </>
  );
};

export default IssuesCard;
