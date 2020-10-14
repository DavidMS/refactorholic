const {persist} = require('../helpers/firebase');
exports.addPost = async function (postString) {
    const doc = JSON.parse(postString);
    if (doc.publishDate != null) {
        doc.publishDate = new Date(doc.publishDate);
    }

    await persist('posts', doc);
}
