import React from "react";

export default function Card ({ title, cardContent }) {
    return (
        <div className="p-5 bg-red-400 border-solid m-2 rounded-xl">
            <h1>{title}</h1>
            <p>{cardContent}</p>
        </div>
    );
}