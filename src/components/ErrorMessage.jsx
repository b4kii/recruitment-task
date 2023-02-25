import React from "react";

export default function ErrorMessage({ error, message }) {
  return (
    <p
      className={
        "absolute top-0 left-1/2 bg-red-300 p-8 rounded-xl text-xl font-bold translate-x-[-50%] animate-dropdown"
      }
    >
      {message}
    </p>
  );
}
