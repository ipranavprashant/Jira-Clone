const Employee = require("../Model/EmployeeSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// signup;

const signup = async (req, res) => {
  try {
    console.log(req.body);
    const employeename = req.body.employeename;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    const hashedPassword = bcrypt.hashSync(password, 8);

    const newEmployee = await Employee.create({
      employeename: employeename,
      email: email,
      password: hashedPassword,
      role: role,
    });

    res.status(201).json({ newEmployee: newEmployee });
  } catch (err) {
    console.log("Error creating an employee! " + err);
    res.status(500).json({ err: err });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body; //object destructuring

    const employee = await Employee.find({ email: email });

    // console.log(employee);
    const emp = employee[0];

    if (!employee) {
      returnres.sendStatus(401);
    }

    const isRightPassword = bcrypt.compareSync(password, emp.password);

    if (!isRightPassword) {
      returnres.sendStatus(401);
    }

    const expirationTime = Date.now() + 60 * 60 * 24 * 30 * 1000;

    const token = jwt.sign(
      { sub: emp._id, expirationTime: expirationTime },
      process.env.SECRETKEY
    );

    await res.cookie("Authorization", token, {
      httpOnly: true,
      // sameSite: lax,
    });

    console.log("Successfully Signed in and the token is: ", token);
    res.json({ token });
  } catch (err) {
    console.log("Error logging in! " + err);
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("Authorization");
    res.status(200).json({ message: "Successfully cleared the cookie!" });
  } catch (err) {
    console.log("Error logging out!");
  }
};

const fetchEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.sendStatus(404);
    }
    res.status(200).json({ employee: employee });
  } catch (err) {
    console.log("Error fetching the specific user!");
    res.status(500).json({ error: err });
  }
};

const fetchAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json({ EmployeeList: employees });
  } catch (err) {
    console.log("Error fetching all the employees");
    res.send(500).json({ error: err });
  }
};

module.exports = {
  signup: signup,
  login: login,
  logout: logout,
  fetchEmployee: fetchEmployee,
  fetchAllEmployees: fetchAllEmployees,
};
