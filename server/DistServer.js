const fs = require('fs');
const path = require('path');

const root = process.cwd();
const pages = fs.readdirSync(path.join(root, '/dist'));

const start = (app) => {
    //roututing
    app.get(`/`, function (req, res) {
        res.redirect(`/visual`);
    });
    pages.forEach(page => {
        app.get(`/${page}`, function (req, res) {
            res.sendFile(path.join(root, `/dist/${page}/index.html`));
        });
    });
    // api
    // return samples file name from sample static folder
    app.get(`/api/samplelist`, function (req, res) {
        const allSample = { samples: fs.readdirSync(path.join(root, '/static/sample')) };
        res.send(JSON.stringify(allSample));
    });
}

module.exports = { start };