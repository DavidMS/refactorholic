const { Given } = require('cucumber');

const chai = require('chai');
chai.use(require('chai-http'));

const givenThePost = function(postString) {
    this.persistedPosts.push(JSON.parse(postString));
}

Given('the post {string}', givenThePost);
Given('the post', givenThePost);
