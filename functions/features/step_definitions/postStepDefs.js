const { Given } = require('cucumber');

const chai = require('chai');
chai.use(require('chai-http'));

Given('there is a post with slug {string}', function(slug) {
    this.posts = [{slug}];
});
