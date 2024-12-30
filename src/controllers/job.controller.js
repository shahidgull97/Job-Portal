import {
  jobs,
  updateOptions,
  updateJobDetails,
  jobToBeDeleted,
  addJob,
} from "../models/job.model.js";
import nodemailer from "nodemailer";
export default class JobController {
  // This is to list all the jobs
  jobListing = (req, res) => {
    res.render("job-list", { jobs });
  };

  //   creating a new job
  getNewJob = (req, res) => {
    res.render("new-job", { updateOptions });
  };
  // adding the job
  addNewJob = (req, res) => {
    console.log(req.body);

    const newJob = addJob(req.body);
    res.render("job-list", { jobs: newJob });
  };

  //   This is to display the details of Job and the apply button
  jobDetails = (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    const jobId = req.params.id;
    const jobData = jobs[jobId];
    res.render("job-detail", {
      jobData,
      applicantCnt: null,
      isLoggedIn,
    });
  };

  // This is to update the job
  updateJob = (req, res) => {
    const jobId = req.params.id;
    const jobData = jobs[jobId];

    res.render("update-job", { jobData, updateOptions });
  };

  // This is to display the updated job details
  updatedJob = (req, res) => {
    const jobId = req.params.id;
    const prevJobData = jobs[jobId];
    const jobData = updateJobDetails(req.body, req.params.id, prevJobData);
    res.render("job-detail", {
      jobData,
      applicantCnt: null,
    });
  };

  // This is for deleting a particular job
  deleteJob = (req, res) => {
    const jobDelId = req.params.id;
    // console.log(req.params.id);

    const jobs = jobToBeDeleted(jobDelId);
    if (jobs.length > 0) {
      res.render("job-list", { jobs });
    } else {
      res.send("There are no more jobs");
    }
  };

  // This is to search the jobs based on role and company
  searchJob = (req, res) => {
    const searchQuery = req.body.search ? req.body.search.toLowerCase() : "";

    // Filter jobs based on the search query
    const filteredJobs = jobs.filter(
      (job) =>
        job.role.toLowerCase().includes(searchQuery) ||
        job.company.toLowerCase().includes(searchQuery)
    );

    // Render the jobs view with the filtered results
    res.render("job-list", { jobs: filteredJobs });
  };

  // This is a send email part for confirmation of successfully applying for the job
  sendEmail = (req, res, next) => {
    const { email } = req.body; // Get the email from the request body

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "codingninjas2k16@gmail.com",
        pass: "slwvvlczduktvhdj",
      },
    });

    // Configure mail details
    const mailDetails = {
      from: "codingninjas2k16@gmail.com",
      to: email,
      subject: "Job Application",
      text: "You Have successfully submited your job Applicaiont",
    };

    try {
      transporter.sendMail(mailDetails); // Wait for the email to be sent
      console.log(`Success: Email sent to ${email}`);
    } catch (error) {
      console.error("Email send failed", error);
    }
    next();
  };
}
