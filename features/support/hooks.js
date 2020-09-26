const {Before, BeforeAll, After, AfterAll} = require('cucumber');
const firebase = require('@firebase/testing');
const {createDriver} = require("../helpers/selenium");
const {initFirebase, endFirebase} = require('../../functions/features/helpers/firebase');
const {setDefaultTimeout} = require('cucumber');
const {By, until} = require('selenium-webdriver')

async function clearDb() {
    await firebase.clearFirestoreData({
        projectId: "blog-test-16eff"
    });
}

setDefaultTimeout(20000);
let initialized = false;
async function waitForAppInitialization() {
    if (!initialized) {
        const driver = createDriver();
        await driver.get(`http://localhost:5000/posts/initializing-application`);
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('application'))));
        await driver.quit();
        initialized = true;

        setDefaultTimeout(4000);
    }
}

BeforeAll(async function () {
    await initFirebase();
    await waitForAppInitialization();
});

AfterAll(async function () {
    await endFirebase();
})

Before(async function () {
    await clearDb();
});

After(async function () {
    await this.driver.quit();
});
