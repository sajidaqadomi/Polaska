

const { src, dest } = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    browesrSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require("gulp-notify"),
    cleanCSS = require("gulp-clean-css"),
    concat = require('gulp-concat');

sass.compiler = require('node-sass');
const css = async (done) => {
    await new Promise((res, rej) => {
        src(["src/css/*.scss", "node_modules/bootstrap/dist/css/bootstrap.min.css"])
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass({ outputStyle: "expand", }).on('error', sass.logError))
            .pipe(autoprefixer('last 2 versions'))
            //.pipe( cleanCSS())//in build
            .pipe(concat("main.css"))
            .pipe(sourcemaps.write('.'))
            .pipe(dest('src/css'))
            .pipe(dest('dist/css'))
            .pipe(notify("Gulp Task [styles] completed:"))
            .pipe(browesrSync.stream())
            .on("end", res)
        done()
    })


}

module.exports = {
    css
}