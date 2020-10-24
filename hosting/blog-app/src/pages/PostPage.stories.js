import React from 'react';
import { text } from '@storybook/addon-knobs';
import PostPage from "./PostPage";

export default {
    title: 'PostPage',
    component: PostPage,
};

const Template = (args) => <PostPage {...args} />;

export const SimplePost = Template.bind({});

SimplePost.args = {
    text: text('simplePostText', 'This is the post text')
};