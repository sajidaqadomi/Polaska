const { src, dest } = require('gulp'),
    plumber = require('gulp-plumber'),


    notify = require("gulp-notify"),
    htmlmin = require('gulp-htmlmin'),

    //  inject = require("gulp-inject")
    browserSync = require('browser-sync').create();

const html = async (done) => {
    await new Promise((res, rej) => {
        src('src/**/*.html')
            .pipe(plumber())
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(dest('dist/'))
            .pipe(browserSync.stream())
            .pipe(notify("Gulp Task [html] completed"))
            .on("end", res)
        done()


    })


}

module.exports = {
    html
}