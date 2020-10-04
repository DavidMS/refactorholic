import React from "react";

export default function ListedPost({title}) {
    return (
        <div className="listed-post">
            <p className="listed-post-title">{title}</p>
        </div>
    );
}
