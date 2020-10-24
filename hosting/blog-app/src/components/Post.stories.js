// YourComponent.stories.js

import React from 'react';
import Post from "./Post";
import { text } from '@storybook/addon-knobs';

export default {
    title: 'Post',
    component: Post,
};

const Template = (args) => <Post {...args} />;

export const NullText = Template.bind({text: null});

export const SimplePost = Template.bind({});

SimplePost.args = {
    text: text('simplePostText', 'This is the post text')
};