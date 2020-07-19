const { parallel, series } = require('gulp'),
    { html } = require('./templates'),
    { css } = require('./styles'),
    { js } = require('./script'),
    { staticFiles } = require('./staticFiles');

const build = series(parallel(js, css, staticFiles), html)//put html series to inject

module.exports = {
    build
}