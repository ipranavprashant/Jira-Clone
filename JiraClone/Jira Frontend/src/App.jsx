import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
// import Footer from "./components/Footer";
import Login from "./components/Login";
import Home from "./components/Home";
import Issues from "./components/Issues";
import Signup from "./components/Signup";
import IssuesSpecificToMe from "./components/IssuesSpecificToMe";
import RaiseIssueForm from "./components/RaiseIssueForm";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/issues-specific-to-me" element={<IssuesSpecificToMe />} />
        <Route path="/raise-an-issue" element={<RaiseIssueForm />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;
