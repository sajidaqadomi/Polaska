const { watch, series } = require('gulp'),
    { html } = require('./templates'),
    { js } = require('./script'),
    { css } = require('./styles'),
    { reload } = require('./server')

const watcher = done => {

    watch("src/**/*.html", series(html, reload));
    watch("src/**/*.js", series(js, reload));
    watch('src/css/**/*.scss', series(css, reload))

    done()
}

module.exports = {
    watcher

}