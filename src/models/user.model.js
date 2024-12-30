export const users = [];
export const appliants = [];

// function to register user
export function userRegistration(user) {
  const id = users.length;
  const newuser = { id, ...user };
  users.push(newuser);
  return users;
}

// Function to add applicants
export function addAplicant(applicant) {
  const id = appliants.length;
  const newappli = { id, ...applicant };
  appliants.push(newappli);
  return appliants;
}
