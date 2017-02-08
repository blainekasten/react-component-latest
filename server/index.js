const express = require('express');
const app = express();

app.get('/validate', function(req, res) {
  setTimeout(() => {
    res.send({
      valid: false,
      updateEndpoint: '/Button210.js',
    });
  }, 2000);
});

app.listen(4000);
