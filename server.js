const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" folder (this will serve our fancy UI)
app.use(express.static('public'));

// Middleware to validate and parse query parameters "a" and "b"
function parseNumbers(req, res, next) {
  const a = req.query.a;
  const b = req.query.b;
  if (a === undefined || b === undefined) {
    return res.status(400).json({ error: "Parameters 'a' and 'b' are required and must be numbers." });
  }
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  if (isNaN(numA) || isNaN(numB)) {
    return res.status(400).json({ error: "Parameters 'a' and 'b' must be valid numbers." });
  }
  req.numA = numA;
  req.numB = numB;
  next();
}

// API endpoints under the /api prefix

// Addition endpoint
app.get('/api/add', parseNumbers, (req, res) => {
  const result = req.numA + req.numB;
  res.json({ result });
});

// Subtraction endpoint
app.get('/api/subtract', parseNumbers, (req, res) => {
  const result = req.numA - req.numB;
  res.json({ result });
});

// Multiplication endpoint
app.get('/api/multiply', parseNumbers, (req, res) => {
  const result = req.numA * req.numB;
  res.json({ result });
});

// Division endpoint with division-by-zero check
app.get('/api/divide', parseNumbers, (req, res) => {
  if (req.numB === 0) {
    return res.status(400).json({ error: "Division by zero is not allowed." });
  }
  const result = req.numA / req.numB;
  res.json({ result });
});

// Start the server only if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

module.exports = app;
