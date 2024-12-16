import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const handleHomeNavigation = () => {
    navigate("/");
  };
  const handleLoginNavigation = () => {
    navigate("/login");
  };
  const handleIssuesNavigation = () => {
    navigate("/issues");
  };
  const handleIssuesSpecificToMeNavigation = () => {
    navigate("/issues-specific-to-me");
  };

  const handleRaiseAnIssueNavigation = () => {
    navigate("/raise-an-issue");
  };

  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    alert("Successfully logged out!");
    navigate("/login");
    window.location.reload();
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkIfLoggedIn = () => {
    const token = localStorage.getItem("Authorization");
    if (!token) setIsLoggedIn(false);
    else setIsLoggedIn(true);
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <>
      <div className="flex justify-between p-5">
        <div className="h-10 w-10 cursor-pointer">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAVFBMVEX///8AAADy8vKioqL5+fkrKyt0dHTQ0NDT09M2Nja5ubnr6+upqamVlZVSUlLc3Nzi4uLExMRfX19FRUVsbGw+Pj5lZWWNjY2CgoJ6enoLCwsXFxdPKYE2AAACRklEQVR4nO3dC46jMAyAYRa6hVLenc6Uzv3vuaBqZh9STCyt5MT6vxPYSiAhGFMUAAAAAAAAAAAAuTqVSTspUrk2/XL5mazL0jfX2FTa24/k3dqodOo360DjvNXHucwX6yhjXWY/uRxnMy3WEWosk5hMZR2fTiXl0tytw9O5N0IyrXV0Wm04l+vZOjitc3i1GTObZds8G8OXjHVseuGLprYOTS+8DXCVTPNpHZvWZ3iaTYN1cFpDeA9QflgHp9WXwWRcLZrF9G4dnc67uNPMbGikgSmKU1ZXzcfBwcaU0fbsLD/O7Nk8rGOM9TjMZbs/d1lsN++dcFf+Q10lv3gOVcTZzMtpqtuuSlbX1pPmTHNLKGGqRAAAAAAAAID/J+m6RtXBWTnO/XpO1trPY9xB8zYo8/q0Pks+8lznqOEZe+tI4/ThSpNvdTblc8vhi4Am+bcZvw1StdnmulpHqLHK5cCddXw6nZTLmNEk2w3STSCzMgCxEKDM5k3zl0d48Zwy+Ajgb7fw6/Mm+ZX/X0/KGlMllDV6mmaubgCubs2uFk1f2xlXG01fjwCuHs58PTb7OtDwddRUuDoEfA2P9RGshLpGAAAAAAAAWLH+5FeiS8TRh9qOPqH31NzAU9sJTw1BXLVqyawQQGyi46q9UWYDI5c1ZnXF7ISWYK6atblqo+eqEtBVMq6agrpq1+qqka6rRdNX82lXbcGLMZvSud1yUHLmqZV+Ttkc5+Lr9xO+fgxSuPplyy7pqkbqGgEAAAAAAAAAQM5+AbaoXAOXviXAAAAAAElFTkSuQmCC" />
        </div>
        <div className="flex space-x-10">
          <div className="cursor-pointer" onClick={handleHomeNavigation}>
            Home
          </div>
          <div className="cursor-pointer" onClick={handleIssuesNavigation}>
            All Issues
          </div>{" "}
          <div
            className="cursor-pointer"
            onClick={handleIssuesSpecificToMeNavigation}
          >
            Issues specific to me
          </div>
          <div
            className="cursor-pointer"
            onClick={handleRaiseAnIssueNavigation}
          >
            Raise an issue
          </div>
          {!isLoggedIn ? (
            <div className="cursor-pointer" onClick={handleLoginNavigation}>
              Login
            </div>
          ) : (
            <div className="cursor-pointer" onClick={handleLogout}>
              Logout
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
