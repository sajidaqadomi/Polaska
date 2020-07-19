const { src, dest } = require('gulp'),
    image = require('gulp-image');


const staticFiles = () => {
    return src('src/imgs/*.{png,svg,jpg}')
        .pipe(image())
        .pipe(dest('dist/imgs'))
}
module.exports = {
    staticFiles
}