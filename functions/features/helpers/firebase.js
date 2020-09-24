const firebase = require('@firebase/testing');

let firestore;

exports.persist = async function (collection, document) {
    await firestore.collection(collection).doc().set(document);
}

exports.initFirebase = async function () {
    await firebase.initializeTestApp({
        projectId: "blog-test-16eff",
        auth: {uid: "user", email: "user@example.com"}
    });

    firestore = await firebase.initializeAdminApp({
        projectId: 'blog-test-16eff',
    }).firestore();
}

exports.endFirebase = function () {
    return Promise.all(firebase.apps().map(app => app.delete()));
}
