if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");

const app = express();
const cors = require("cors");

const connectToMongo = require("./config/connectToMongo");
const employeeController = require("./Controller/employeeController");
const issueController = require("./Controller/issueController");

var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(jsonParser);
app.use(urlencodedParser);
const corsOptions = {
  origin: "http://localhost:5175", // Allow only requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Enable cookies and other credentials to be sent
};
app.use(cors(corsOptions));

// app.all("/", (req, res) => {
//   res.send("I was invoked!!");
// });

connectToMongo();

//routes specific to authorization
app.post("/signup", employeeController.signup);
app.post("/login", employeeController.login);
app.get("/logout", employeeController.logout);
app.get("/fetch-employee/:id", employeeController.fetchEmployee);
app.get("/fetch-all-employees/", employeeController.fetchAllEmployees);

//routes specific to issues
app.post("/create-issue", issueController.createIssue);
app.get("/fetch-all-issues", issueController.fetchAllIssues);
app.get("/fetch-specific-issue/:id", issueController.fetchSpecificIssue);
app.put("/update-issue/:id", issueController.updateIssue);
app.delete("/delete-issue/:id", issueController.deleteIssue);
app.get(
  "/employee-specific-issues/:id",
  issueController.issuesSpecificToAnEmployee
);

const port = 4010;

app.listen(port, () => {
  console.log(`The server is up and running at the port no: ${port}`);
});
