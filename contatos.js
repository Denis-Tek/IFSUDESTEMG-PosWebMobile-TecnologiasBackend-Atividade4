const express = require('express');
const router  = express.Router();

// VIEWS
router.get('/contato', (req, res) => {
  res.render("contato");
});
  
  // POST
router.post('/contato', (req, res) => {
  console.log(req.body);
  console.log('Nome:   ' + req.body.nome);
  console.log('Email:  ' + req.body.email);
  console.log('Motivo: ' + req.body.motivo);
  res.redirect('/');
});

module.exports = router;