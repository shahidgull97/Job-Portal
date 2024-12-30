import { body, validationResult } from "express-validator";

export const formapplyValidation = async (req, res, next) => {
  // Write your code here
  // 1. Setup the rules for validation

  const rules = [
    body("location").notEmpty().withMessage("Job Location is required"),
    body("company").notEmpty().withMessage("Company Name is required"),
    body("package").notEmpty().withMessage("Enter correct salary "),
    body("openings").isNumeric().withMessage("Number is required"),
    body("skills").isArray({ min: 2 }).withMessage("Add at least two skills"),
    body("applyby").notEmpty().withMessage("Add a date"),
  ];
  // 2.Run those rules
  await Promise.all(rules.map((rule) => rule.run(req)));
  // 3.Check if there are any errors after running the rules
  var validationErrors = validationResult(req);
  // 4. if errors return the error message
  if (!validationErrors.isEmpty()) {
    const error = validationErrors.array();
    return res.render("jobAppForm", { error });
  }
  next();
};
