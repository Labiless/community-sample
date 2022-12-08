const express = require('express');
const fs = require('fs');
const path = require('path');

const pages = fs.readdirSync(path.join(__dirname, '/dist'));
const port = process.env.PORT || 3000;
const app = express();

app.use('/', express.static(__dirname ));

app.get(`/`, function (req, res) {
    res.redirect(`/visual`);
});

pages.forEach(page => {
    app.get(`/${page}`, function (req, res) {
        res.sendFile(path.join(__dirname, `./dist/${page}/index.html`));
    });
});

// api
// return samples file name from sample static folder
app.get(`/api/samplelist`, function (req, res) {
    const allSample = {samples : fs.readdirSync(path.join(__dirname, '/static/sample'))};
    res.send(JSON.stringify(allSample));
});

//start
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});