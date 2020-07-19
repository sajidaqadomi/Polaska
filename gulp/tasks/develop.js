const { task, parallel } = require("gulp"),
    { series } = require('gulp'),
    { cleanup } = require('./cleanup'),
    { watcher } = require('./watch'),
    { server } = require('./server');
const { build } = require('./build');



// task("serving", parallel(server, watcher))
const develop = series(cleanup, build, parallel(server, watcher))

module.exports = {
    develop
}