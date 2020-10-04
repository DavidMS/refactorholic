const {Given} = require('cucumber');

const chai = require('chai');
const {addPost} = require("../helpers/post");
chai.use(require('chai-http'));

Given('the post {string}', addPost);
Given('the post', addPost);
