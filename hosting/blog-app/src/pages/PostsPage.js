import React from "react";
import {gql, useQuery} from "@apollo/client";
import ListedPost from "../components/ListedPost";

const GET_POSTS = gql`
    query Posts {
        posts {
            title
        }
    }`;

export function Posts({children}) {
    return <div className="posts">{children}</div>
}

export default function PostsPage() {
    const { loading, error, data } = useQuery(GET_POSTS);

    let posts = [];
    if (!loading && ! error) {
        posts = data.posts;

        if (posts.length === 0) {
            return (
                <Posts>
                    <p>No post was found</p>
                </Posts>
            );
        }
    }

    return (
        <Posts>
            {posts.map(post => <ListedPost key={post.title} title={post.title} />)}
        </Posts>
    );
}
