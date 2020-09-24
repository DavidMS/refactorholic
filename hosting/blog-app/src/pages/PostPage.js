import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import client from "../graphql/client";
import {gql} from "@apollo/client";
import Post from "../components/Post";

const GET_POST = gql`
    query GetPost($slug: String!) {
        post(slug: $slug) {
            text
        }
    }`

export default function PostPage() {
    const {slug} = useParams();
    const [text, setText] = useState('');

    useEffect(() => {
        client.query({
            query: GET_POST,
            variables: {slug}
        }).then(({ loading, error, data }) => {
            if (loading) {
                return;
            }

            if (error) {
                setText(error.message);
            } else {
                setText(data.post != null ? data.post.text : 'Post not found');
            }
        }).catch(error => {
            setText(error.message);
        });
    }, [slug]);

    return <Post text={text} />;
}