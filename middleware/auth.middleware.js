export const authSession = (req, res, next) => {
  if (req.session.userEmail) {
    next();
  } else {
    res.render("404-page");
  }
};
