import express, { urlencoded } from "express";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";

import session from "express-session";
import { uploadFile } from "./middleware/uploadfile.middleware.js";

import UserController from "./src/controllers/user.controller.js";
import JobController from "./src/controllers/job.controller.js";
import { authSession } from "./middleware/auth.middleware.js";
import { formapplyValidation } from "./middleware/validators/applyValidator.js";

import cookieParser from "cookie-parser";
import { setLastVisit } from "./middleware/setLastVisit.js";

const app = express();
app.use(express.json());

// This is for the session of a particular user
app.use(cookieParser());
app.use(setLastVisit);

app.use(
  session({
    secret: "kya wanav",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(urlencoded({ extended: true }));
app.use(express.static(path.resolve("public")));

// Middleware for using EJS layouts
app.use(expressEjsLayouts);

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.resolve("src", "views"));

const userController = new UserController();
const jobController = new JobController();

// This is to make the username and isLOggedIn globaly accessible
app.use((req, res, next) => {
  res.locals.username = req.session.userName || null; // Set the name in res.locals
  res.locals.isLoggedIn = req.session.isLoggedIn || false; // Set logged-in status
  next(); // Proceed to the next middleware/route handler
});

// This is for the first landing of the app
app.get("/landing", userController.landinPage);
// Thsi is to get all the jobs listed
app.get("/jobs", jobController.jobListing);

// This is to get all the details related to the job
app.get("/job-detail/:id", jobController.jobDetails);

// after adding a user to the appliation
app.post("/landing", userController.addUser);
app.post("/jobs", jobController.jobListing);

// This is for updating the job and for its validtion
app.get("/update/:id", jobController.updateJob);
app.post("/job-detail/:id", formapplyValidation, jobController.updatedJob);

// This is for submiting a job application
app.post(
  "/jobapplicants/:id",
  uploadFile.single("file"),
  jobController.sendEmail,
  userController.userApplicants
);

// This for the applicants of the job
app.get("/applicants", authSession, userController.getApplicants);

// Deleting a job
app.get("/delete/:id", jobController.deleteJob);

// New Job
app.get("/newjob", authSession, jobController.getNewJob);
app.post("/addjob", formapplyValidation, jobController.addNewJob);

// userlogin
app.post("/userlogin", userController.userLogin);

app.get("/logout", userController.userLogout);

// send email
app.post("/searchJob", jobController.searchJob);
export default app;
