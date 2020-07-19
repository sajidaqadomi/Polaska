const del = require('del'),

    notifier = require('node-notifier');

const cleanup = async (done) => {
    const deletedDirectoryPaths = await del('dist/');
    notifier.notify('Folders were successfully deleted');
    done()

}

module.exports = {
    cleanup
}