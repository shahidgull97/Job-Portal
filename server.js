import app from "./index.js";
const port = 2000;
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
