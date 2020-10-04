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

Then('an empty array of {string} is returned', function(resource) {
    expectNoGraphqlErrors(this.res);

    expect(this.res.body.data[resource]).is.not.null;
    expect(this.res.body.data[resource]).length(0);
});

function thenTheFollowingResourceIsReturned(resource, expected) {
    expectNoGraphqlErrors(this.res);

    const expectedObject = JSON.parse(expected);
    expect(this.res.body.data[resource]).to.eql(expectedObject);
}

Then('the following {string} is returned', thenTheFollowingResourceIsReturned);
Then('the following {string} is returned: {string}', thenTheFollowingResourceIsReturned);

function toResource(fields, row) {
    const result = {};

    for (let i = 0; i < fields.length; i++) {
        result[fields[i]] = row[i];
    }

    return result;
}

Then('the following {string} are returned', function(resource, table) {
    expectNoGraphqlErrors(this.res);

    const expectedFields = table.rawTable[0];
    const expectedResources = table.rows().map(row => toResource(expectedFields, row));
    const resources = this.res.body.data[resource];

    expect(resources).length(expectedResources.length);
    for (let i = 0; i < expectedResources.length; i++) {
        expect(resources[0]).to.eql(expectedResources[0]);
    }
});
