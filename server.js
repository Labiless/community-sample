const express = require('express');
const fs = require('fs');
const path = require('path');

const pages = fs.readdirSync(path.join(__dirname, '/dist'));
const port = process.env.PORT || 3000;
const app = express();

app.use('/', express.static(__dirname ));

app.get(`/`, function (req, res) {
    res.redirect(`/home`);
});

pages.forEach(page => {
    app.get(`/${page}`, function (req, res) {
        res.sendFile(path.join(__dirname, `./dist/${page}/index.html`));
    });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});