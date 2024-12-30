export let jobs = [
  {
    id: 0,
    tag: "Actively Hiring",
    company: "Coding Ninjas",
    jobCatagory: "Tech",
    role: "SDE",
    location: "Gurgaon HR IND Remote",
    package: "₹14-20lpa",
    applyby: "10-11-2024",
    openings: 3,
    Applicants: 0,
    skills: ["REACT", "NodeJs", "JS", "SQL", "MongoDB", "Express", "AWS"],
  },
  {
    id: 1,
    tag: "Actively Hiring",
    company: "Go Digit",
    jobCatagory: "Tech",
    role: "Angular Developer",
    location: "Pune IND On-Site",
    package: "₹6-10lpa",
    applyby: "30-10-2024",
    openings: 3,
    Applicants: 0,
    skills: ["Angular", "JS", "SQL", "MongoDB", "Express", "AWS"],
  },
  {
    id: 2,
    tag: "Actively Hiring",
    company: "Just Pay",
    jobCatagory: "Tech",
    role: "SDE ",
    location: "Bangalore IND",
    package: "₹20-26lpa",
    applyby: "23-11-2024",
    openings: 3,
    Applicants: 0,
    skills: ["REACT", "NodeJs", "JS", "SQL", "MongoDB", "Express", "AWS"],
  },
];

export const updateOptions = [
  {
    skills: [
      "REACT",
      "NodeJs",
      "JS",
      "SQL",
      "MongoDB",
      "Express",
      "AWS",
      "JavaScript",
      "HTML5",
      "CSS",
      "Python",
      "Go",
      "Rust",
      "Java",
      "Data Structures And Algorithms",
    ],

    jobCatagory: ["Tech", "Non Tech"],

    roles: [
      "HR",
      "SDE",
      "MERN Developer",
      "MEAN Developer",
      "JAVA Developer",
      "Front-End Developer",
      "Back-End Developer",
      "Full Stack Developer",
    ],
  },
];

// To assign dynamic id to the objects of an array
function updateItemIds() {
  jobs = jobs.map((item, index) => ({ ...item, id: index }));
}

// Function to update the job details
export function updateJobDetails(job, id, prevJob) {
  // console.log(job);
  const ID = Number(id);

  const jobToUpdate = jobs.find((value) => value.id === ID);
  console.log(prevJob.skills);

  console.log(job.skills);
  if (jobToUpdate) {
    jobToUpdate.company = job.company;
    jobToUpdate.jobCatagory = job.jobCatagory;
    jobToUpdate.role = job.role;
    jobToUpdate.location = job.location;
    jobToUpdate.package = job.package;
    jobToUpdate.applyby = job.applyby || prevJob.applyby;
    jobToUpdate.openings = job.openings;
    jobToUpdate.skills = [
      ...prevJob.skills,
      ...(Array.isArray(job.skills) ? job.skills : [job.skills]),
    ];
  }
  console.log(jobToUpdate.skills);

  return jobToUpdate;
}

// Function to delete a job
export function jobToBeDeleted(jobId) {
  const id = Number(jobId);
  jobs = jobs.filter((value) => value.id !== id);
  updateItemIds();
  return jobs;
}

// Function to add a job
export function addJob(job) {
  jobs.push(job);
  updateItemIds();
  console.log(jobs[0].skills);

  return jobs;
}
