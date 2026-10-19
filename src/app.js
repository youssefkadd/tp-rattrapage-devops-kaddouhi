const express = require('express');
const app = express();
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/add/:a/:b', (req, res) => {
  const sum = Number(req.params.a) + Number(req.params.b);
  res.json({ result: sum });
});
module.exports = app;
