const chai = require('chai');

exports.expectNoGraphqlErrors = function(response) {
    expect(response).to.be.json;
    expect(response.body.errors, 'There are errors in the response').to.not.exist;
};

/**
 * Performs a POST request to the API server.
 *
 * @returns {request.SuperAgentRequest}
 */
const apiPost = function() {
    return chai.request('http://localhost:5001').post('/blog-test-16eff/us-central1/api');
}

exports.apiPost = apiPost;

/**
 * Performs a GraphQL query to the API server.
 *
 * @param query {string} The query string.
 * @returns {Promise<request.Response>}
 */
exports.apiQuery = function(query) {
    let data = { query: query.startsWith('{') ? query : `{${query}}` };
    return apiPost().send(data);
}