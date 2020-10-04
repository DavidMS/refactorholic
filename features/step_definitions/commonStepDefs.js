const {When, Then} = require('cucumber');
const {By, until} = require('selenium-webdriver');

When('the user navigates to {string}', async function (url) {
    await this.driver.get(`http://localhost:5000${url}`);
    await this.driver.wait(until.elementIsVisible(this.driver.findElement(By.id('application'))));
});

Then('the text {string} is rendered', async function (text) {
    const xpath = `//*[contains(text(),"${text}")]`;
    const el = await this.driver.wait(until.elementLocated(By.xpath(xpath)));
    await this.driver.wait(until.elementIsVisible(el));
});
