const { When, Then } = require('cucumber');
const chai = require('chai');
const { expectNoGraphqlErrors, apiQuery } = require("./utils");

const expect = chai.expect;

When('the user queries:', function(query) {
    return apiQuery(query)
        .then(res => {
            this.res = res;
        });
});

When('the user queries {string}', function(query) {
    return apiQuery(query)
        .then(res => {
            this.res = res;
        });
});

Then('a null {string} is returned', function(resource) {
    expectNoGraphqlErrors(this.res);

    expect(this.res.body.data[resource]).is.null;
});

function thenTheFollowingResourceIsReturned(resource, expected) {
    expectNoGraphqlErrors(this.res);

    const expectedObject = JSON.parse(expected);
    expect(this.res.body.data[resource]).to.eql(expectedObject);
}

Then('the following {string} is returned', thenTheFollowingResourceIsReturned);
Then('the following {string} is returned: {string}', thenTheFollowingResourceIsReturned);
