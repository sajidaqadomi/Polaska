
const browserSync = require('browser-sync').create();

const server = (done) => {
    browserSync.init({
        server: {
            baseDir: './src/'
        }
    })
}

const reload = done => {
    browserSync.reload()
    done()
}

module.exports = {
    server,
    reload
}