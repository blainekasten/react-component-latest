const express = require('express');
const app = express();

const latest = '2.1.0';

app.get('/validate', function(req, res) {
  // needs more logic to ensure it's not trying to update it to a major breaking change

  if (req.query.version !== latest) {
    setTimeout(() => {
      res.send({
        valid: false,
        updateEndpointJS: '/Uniform210.js',
        updateEndpointCSS: '/Uniform210.css',
      });
    }, 2000);
  } else {
    res.send({valid: true});
  }
});

app.listen(4000);
