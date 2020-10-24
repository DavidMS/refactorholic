const {Before, BeforeAll, AfterAll} = require('cucumber');
const firebase = require('@firebase/testing');
const {initFirebase, endFirebase} = require('../helpers/firebase');

async function clearDb () {
    await firebase.clearFirestoreData({
        projectId: "blog-test-16eff"
    });
}

BeforeAll(async () => {
    await initFirebase();
});

AfterAll(function() {
    return endFirebase();
})

Before(async () => {
    await clearDb();
});
