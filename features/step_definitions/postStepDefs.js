const {Given} = require('cucumber');
const {persist} = require('../../functions/features/helpers/firebase');

const givenThePost = async function (postString) {
    await persist('posts', {
        slug: 'a-slug',
        text: 'some text',
        ...JSON.parse(postString)
    });
}

Given('the post {string}', givenThePost);
Given('the post', givenThePost);
