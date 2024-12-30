import {
  userRegistration,
  appliants,
  addAplicant,
  users,
} from "../models/user.model.js";
import { jobs, updateOptions, updateJobDetails } from "../models/job.model.js";
let applicantCnt = 0;
export default class UserController {
  // This is for the initial landing page
  landinPage = (req, res) => {
    res.render("landing-page", { error: null });
  };

  // This is to add the user as recruiter
  addUser = (req, res) => {
    // console.log(req.body);

    const newUser = userRegistration(req.body);
    if (newUser) {
      res.redirect("/");
    }
  };

  // This is for login of the user
  userLogin = (req, res) => {
    const { email, password } = req.body;
    req.session.userEmail = email;
    let flag = false;
    users.forEach((value) => {
      if (value.email === email) {
        req.session.userName = value.name;
        req.session.isLoggedIn = true;
        flag = true;
        return res.redirect("/jobs");
      }
    });
    if (!flag) {
      res.render("landing-page", { error: "User Does not exist" });
    }
  };

  // This is for the applicants that have applied for the job
  userApplicants = (req, res) => {
    const jobId = req.params.id;
    const jobData = jobs[jobId];
    jobData.Applicants = jobData.Applicants + 1;
    const { name, email, contact } = req.body;
    const { filename } = req.file;
    const addApplicantDetails = addAplicant({ name, email, contact, filename });
    res.render("job-detail", { jobData, applicantCnt });
  };

  // This is to get all the applicants
  getApplicants = (req, res) => {
    res.render("applicants", { appliants });
  };

  // This is for logout and clearing the session
  userLogout = (req, res) => {
    console.log("logout");

    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  };
}
