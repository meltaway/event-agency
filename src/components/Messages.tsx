import React from 'react';

export function LoadingMessage(props) {
    return (
        <p>Please wait. {props.message}</p>
    );
}

export function ErrorMessage(props) {
    return (
        <p>There was an error {props.message}!</p>
    );
}
