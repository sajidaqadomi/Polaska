const { src, dest, lastRun } = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    browserSync = require("browser-sync").create(),
    uglify = require("gulp-uglify-es").default,
    notify = require("gulp-notify"),
    concat = require("gulp-concat"),
    babel = require('gulp-babel');

const js = async (done) => {
    await new Promise((res, rej) => {
        //src(['node_modules/jquery/dist/jquery.js', "node_modules/popper.js/dist/popper.min.js", "node_modules/bootstrap/dist/js/bootstrap.min.js", scripts.srcScript], { since: lastRun(js) })
        src('src/js/**/*.js')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['@babel/preset-env'],
                ignore: ["node_modules"]
            }))

            .pipe(uglify())
            .pipe(concat("main.min.js"))
            .pipe(sourcemaps.write('.'))
            .pipe(dest('dist/js'))
            .pipe(browserSync.stream())
            .pipe(notify("Gulp Task [js] completed"))
            .on("end", res)
        done()


    })

}

module.exports = {
    js
}