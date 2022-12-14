const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');

const pages = fs.readdirSync(path.join(__dirname, '/src')).filter(el => el !== "shared");

const entry = (() => {
    const res = {};
    pages.forEach(page => {
        res[page] = `./src/${page}/index.js`
    });
    return res;
})();

const plugins = [];
Object.keys(entry).forEach(key => {
    const rootName = entry[key].split("/")[2];
    const htmlPlugin = new HtmlWebpackPlugin({
        filename: `${rootName}/index.html`,
        title: rootName,
        template: `src/${rootName}/template.html`,
        chunks: [`dist/${rootName}/index.bundle.js`]
    });
    plugins.push(htmlPlugin);
});

module.exports = {
    mode: "development",
    entry,
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name]/index.bundle.js',
        clean: true
    },
    plugins,
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.less$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ],
            },
        ],
    },
};