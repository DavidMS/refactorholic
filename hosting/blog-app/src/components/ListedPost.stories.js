// YourComponent.stories.js

import React from 'react';
import { text } from '@storybook/addon-knobs';
import ListedPost from "./ListedPost";

export default {
    title: 'ListedPost',
    component: ListedPost,
};

const Template = (args) => <ListedPost {...args} />;

export const NoPost = Template.bind({title: null});

export const SimplePost = Template.bind({});

SimplePost.args = {
    title: text('simpleListedPostText', 'This is the post title')
};