const {Before, BeforeAll, AfterAll} = require('cucumber');
const firebase = require('@firebase/testing');
const {init} = require('../helpers/firebase');

async function clearDb () {
    await firebase.clearFirestoreData({
        projectId: "blog-test-16eff"
    });
}

BeforeAll(async () => {
    await init();
});

AfterAll(() => {
    return Promise.all(firebase.apps().map(app => app.delete()));
})

Before(async () => {
    await clearDb();
});
