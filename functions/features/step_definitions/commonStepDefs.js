const { When, Then } = require('cucumber');
const chai = require('chai');

const expect = chai.expect;

When('the user queries:', function(query) {
    return chai.request('http://localhost:5001')
        .post('/blog-test-16eff/us-central1/api')
        .send({ query })
        .then(res => {
            this.res = res;
        });
});

Then('a null {string} is returned', function(resource) {
    expect(this.res).to.have.status(400);
    expect(this.res).to.be.json;
    expect(this.res.body.errors).to.not.exist;
    expect(this.res.body.data[resource]).is.null;
});
