import React from 'react';

export default function Post({text}) {
    return (<p data-testid="text" >{text}</p>);
}