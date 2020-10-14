const {By, until} = require("selenium-webdriver");
const {addPost} = require("../../functions/features/helpers/post");
const {Given, Then} = require('cucumber');

const givenThePost = async function (postString) {
    await addPost(postString);
}

Given('the post {string}', givenThePost);
Given('the post', givenThePost);


Then('the following posts are rendered', async function(table) {
    const elements = await this.driver.wait(until.elementsLocated(By.className('listed-post')));
    expect(elements).length(table.rows().length);

    const expectedFields = table.rawTable[0];

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        for (let j = 0; j < expectedFields.length; j++) {
            const expectedValue = table.rows()[i][j];
            const expectedField = expectedFields[j];

            const fieldElement = await element.findElement(By.className(`listed-post-${expectedField}`));
            const fieldValue = await fieldElement.getText();

            expect(fieldValue).to.eql(expectedValue);
        }
    }
});
