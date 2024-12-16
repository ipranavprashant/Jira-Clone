const Issue = require("../Model/IssueSchema");
const Employee = require("../Model/EmployeeSchema");
// operations required:
// fetch all the issues
// fetch a specific issue
// add an issue
// update an issue (this is specifically to mark the issue status as done, in process etc..)
// delete an issue

const createIssue = async (req, res) => {
  try {
    const { title, description, severity, employee, status } = req.body;
    const createNewIssue = await Issue.create({
      title: title,
      description: description,
      severity: severity,
      employee: employee,
      status: status,
    });

    res.json({ createdNewIssue: createNewIssue });
  } catch (err) {
    console.log("Errors creating the issue " + err);
    res.status(500);
    //
  }
};

const fetchAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json({ Issues: issues });
  } catch (err) {
    console.log("Errors fetching the issues!");
    res.status(500);
  }
};

const fetchSpecificIssue = async (req, res) => {
  try {
    const issueId = req.params.id;
    const issue = await Issue.findById(issueId);

    res.json({ "Issue Specific to the ID": issue });
  } catch (err) {
    console.log("Errors fetching the specific issue!");
    res.status(500);
  }
};

const updateIssue = async (req, res) => {
  try {
    const issueId = req.params.id;
    const { title, description, severity, employee, status } =
      req.body.updatedData;

    console.log(issueId);
    const deprecatedIssue = await Issue.findByIdAndUpdate(
      { _id: issueId },
      {
        title: title,
        description: description,
        severity: severity,
        employee: employee,
        status: status,
      }
    );

    // Find the deprecated issue if you need it (optional)
    const updatedIssue = await Issue.findById(issueId);

    console.log(deprecatedIssue, updatedIssue);

    res.json({ deprecatedIssue, updatedIssue });
  } catch (err) {
    console.log("Errors updating the specific issue! " + err);
    res.status(500).send("Error updating the issue");
  }
};

const deleteIssue = async (req, res) => {
  try {
    const issueId = req.params.id;
    const deletedIssue = await Issue.deleteOne({ _id: issueId });

    res.json({ "Deleted Issue": deletedIssue });
  } catch (err) {
    console.log("Errors deleting the specific issue!");
    res.status(500);
  }
};

const issuesSpecificToAnEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);
    if (!employee) res.sendStatus(401);

    const issues = await Issue.find({ employee: employeeId });

    res.json({ Issues: issues });
  } catch (err) {
    console.log("Error fetching employee specific issues!");
    res.status(500);
  }
};

module.exports = {
  createIssue: createIssue,
  deleteIssue: deleteIssue,
  updateIssue: updateIssue,
  fetchSpecificIssue: fetchSpecificIssue,
  fetchAllIssues: fetchAllIssues,
  issuesSpecificToAnEmployee: issuesSpecificToAnEmployee,
};
