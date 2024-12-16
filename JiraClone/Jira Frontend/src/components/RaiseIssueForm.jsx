import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RaiseIssueForm = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    severity: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("handle change was invoked by: ", name);

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "Signup buttton was invoked with the following data: ",
      data.title,
      data.description,
      data.severity,
      data.status
    );

    const token = localStorage.getItem("Authorization");
    const decodedToken = jwtDecode(token);
    const id = decodedToken.sub;

    const newIssue = {
      title: data.title,
      description: data.description,
      severity: data.severity,
      employee: id,
      status: data.status,
    };

    const res = await axios.post(
      "http://localhost:4010/create-issue",
      newIssue
    );
    console.log(res);
    if (res.status === 500) {
      console.log("Error raising an issue!");
    } else {
      alert("Issue has successfully been raised!");
      navigate("/issues-specific-to-me");
    }
  };

  return (
    <>
      <div className="p-8 flex justify-center">
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
            onClick={handleSubmit}
            className="rounded bg-gray-400 p-3 w-24"
          >
            Submit Issue
          </button>
        </div>
      </div>
    </>
  );
};

export default RaiseIssueForm;
