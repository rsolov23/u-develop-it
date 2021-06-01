const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

//get test route
// app.get("/", (req, res) => {
//   res.json({
//     message: "Hello World",
//   });
// });

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//route to handle user requests
app.use((req, res) => {
  res.status(404).end();
});

//start express js server on port 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
