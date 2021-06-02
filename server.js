const express = require("express");
const db = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes");
const router = require("./routes/apiRoutes/candidateRoutes");
// const inputCheck = require("./utils/inputCheck");

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
app.use("/api", apiRoutes);


// Not Found response for unmatched routes
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
// Get all candidates and their party affiliation
// app.get("/api/candidates", (req, res) => {
//   const sql = `SELECT candidates.*, parties.name
//                   AS party_name
//                   FROM candidates
//                   LEFT JOIN parties
//                   ON candidates.party_id = parties.id`;

//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: rows,
//     });
//   });
// });

// Get single candidate with party affiliation
// app.get("/api/candidate/:id", (req, res) => {
//   const sql = `SELECT candidates.*, parties.name
//                  AS party_name
//                  FROM candidates
//                  LEFT JOIN parties
//                  ON candidates.party_id = parties.id
//                  WHERE candidates.id = ?`;
//   const params = [req.params.id];

//   db.query(sql, params, (err, row) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: row,
//     });
//   });
// });

// Create a candidate
// app.post("/api/candidate", ({ body }, res) => {
//   // Candidate is allowed not to be affiliated with a party
//   const errors = inputCheck(
//     body,
//     "first_name",
//     "last_name",
//     "industry_connected"
//   );
//   if (errors) {
//     res.status(400).json({ error: errors });
//     return;
//   }

//   const sql = `INSERT INTO candidates (first_name, last_name, industry_connected, party_id) VALUES (?,?,?,?)`;
//   const params = [
//     body.first_name,
//     body.last_name,
//     body.industry_connected,
//     body.party_id,
//   ];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: body,
//       changes: result.affectedRows,
//     });
//   });
// });

// // Update a candidate's party
// app.put("/api/candidate/:id", (req, res) => {
//   // Candidate is allowed to not have party affiliation
//   const errors = inputCheck(req.body, "party_id");
//   if (errors) {
//     res.status(400).json({ error: errors });
//     return;
//   }

//   const sql = `UPDATE candidates SET party_id = ?
//                  WHERE id = ?`;
//   const params = [req.body.party_id, req.params.id];
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       // check if a record was found
//     } else if (!result.affectedRows) {
//       res.json({
//         message: "Candidate not found",
//       });
//     } else {
//       res.json({
//         message: "success",
//         data: req.body,
//         changes: result.affectedRows,
//       });
//     }
//   });
// });

// Delete a candidate
// app.delete("/api/candidate/:id", (req, res) => {
//   const sql = `DELETE FROM candidates WHERE id = ?`;
//   const params = [req.params.id];
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: "Candidate not found",
//       });
//     } else {
//       res.json({
//         message: "deleted",
//         changes: result.affectedRows,
//         id: req.params.id,
//       });
//     }
//   });
// });

// Get all parties
// app.get("/api/parties", (req, res) => {
//   const sql = `SELECT * FROM parties`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: rows,
//     });
//   });
// });

// Get single party
// app.get("/api/party/:id", (req, res) => {
//   const sql = `SELECT * FROM parties WHERE id = ?`;
//   const params = [req.params.id];

//   db.query(sql, params, (err, row) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: row,
//     });
//   });
// });

// Delete a party
// app.delete("/api/party/:id", (req, res) => {
//   const sql = `DELETE FROM parties WHERE id = ?`;
//   const params = [req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: res.message });
//       // checks if anything was deleted
//     } else if (!result.affectedRows) {
//       res.json({
//         message: "Party not found",
//       });
//     } else {
//       res.json({
//         message: "deleted",
//         changes: result.affectedRows,
//         id: req.params.id,
//       });
//     }
//   });
// });

// // Get all candidates
// app.get('/api/candidates', (req, res) => {
//     const sql = `SELECT candidates.*, parties.name
//                   AS party_name
//                   FROM candidates
//                   LEFT JOIN parties
//                   ON candidates.party_id = parties.id`;

//     db.query(sql, (err, rows) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: rows
//       });
//     });
//   });

// // Get a single candidate
// app.get('/api/candidate/:id', (req, res) => {
//     const sql = `SELECT candidates.*, parties.name
//                  AS party_name
//                  FROM candidates
//                  LEFT JOIN parties
//                  ON candidates.party_id = parties.id
//                  WHERE candidates.id = ?`;
//     const params = [req.params.id];

//     db.query(sql, params, (err, row) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: row
//       });
//     });
//   });

//   // Create a candidate
// app.post('/api/candidate', ({ body }, res) => {
//     // Candidate is allowed not to be affiliated with a party
//     const errors = inputCheck(
//       body,
//       'first_name',
//       'last_name',
//       'industry_connected'
//     );
//     if (errors) {
//       res.status(400).json({ error: errors });
//       return;
//     }
//     const sql = `INSERT INTO candidates (first_name, last_name, industry_connected, party_id) VALUES (?,?,?,?)`;
//     const params = [
//       body.first_name,
//       body.last_name,
//       body.industry_connected,
//       body.party_id
//     ];

//     db.query(sql, params, (err, result) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: body,
//         changes: result.affectedRows
//       });
//     });
//   });

// //display all parties and display an individual party.
// app.get("/api/parties", (req, res) => {
//   const sql = `SELECT * FROM parties`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: rows,
//     });
//   });
// });

// //id parameter for a single party
// app.get("/api/party/:id", (res, req) => {
//   const sql = `SELECT * FROM parties WHERE id = ?`;
//   const params = [req.params.id];
//   db.query(sql, params, (err, rows) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: row,
//     });
//   });
// });
// //update a cadidates party
// app.put("/api/candidate/:id", (req, res) => {
//   const errors = inputCheck(req.body, "party_id");
//   if (errors) {
//     res.status(400).json({ error: errors });
//     return;
//   }
//   const sql = `UPDATE candidates SET party_id = ?
//     WHERE id = ?`;
//   const params = [req.body.party_id, req.params.id];
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       //check if record was found
//     } else if (!result.affectedRows) {
//       res.json({
//         message: "candidate not found",
//       });
//     } else {
//       res.json({
//         message: "success",
//         data: req.body,
//         changes: result.affectedRows,
//       });
//     }
//   });
// });
// // Delete a candidate
// app.delete("/api/candidate/:id", (req, res) => {
//   const sql = `DELETE FROM candidates WHERE id = ?`;
//   const params = [req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: "Candidate not found",
//       });
//     } else {
//       res.json({
//         message: "deleted",
//         changes: result.affectedRows,
//         id: req.params.id,
//       });
//     }
//   });
// });
// //delete a party
// app.delete("/api/party/:id", (req, res) => {
//   const sql = `DELETE FROM parties WHERE id = ?`;
//   const params = [req.params.id];
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       //checks if anything was deleted
//     } else if (!result.affectedRows) {
//       res.json({
//         message: "Party not found",
//       });
//     } else {
//       res.json({
//         message: "deleted",
//         changes: result.affectedRows,
//         id: req.params.id,
//       });
//     }
//   });
// });
// // Create a candidate
// app.post("/api/candidate", ({ body }, res) => {
//   const errors = inputCheck(
//     body,
//     "first_name",
//     "last_name",
//     "industry_connected"
//   );
//   if (errors) {
//     res.status(400).json({ error: errors });
//     return;
//   }

//   const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
//       VALUES (?,?,?)`;
//   const params = [body.first_name, body.last_name, body.industry_connected];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: body,
//     });
//   });
// });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// //connect to database
// const db = mysql.createConnection(
//   {
//     host: "localhost",
//     //your mysqlusername
//     user: "root",
//     //your mysql password
//     password: "P@tywagon23",
//     database: "election",
//   },
//   console.log("connected to election database")
// );

// // Create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//               VALUES (?,?,?,?)`;
// const params = [1, "Ronald", "Firbank", 1];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// //DELETE a candidate
// // db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, results) => {
// //   if (err) {
// //     console.log(err);
// //   }
// //   console.log(result);
// // });
// // get single candidate
// app.get("/api/candidates", (req, res) => {
//   const sql = `SELECT * FROM candidates`;
//   db.query(sql, (err, row) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: rows,
//     });
//   });
// });

// //route to handle user requests
// app.use((req, res) => {
//   res.status(404).end();
// });

// //start express js server on port 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
