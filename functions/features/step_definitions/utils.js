exports.expectNoGraphqlErrors = function(response) {
    expect(response).to.have.status(200);
    expect(response).to.be.json;
    expect(response.body.errors, 'There are errors in the response').to.not.exist;
};
