"use client";
import { useState } from "react";

export default function Add() {
  const [isOpen, setIsOpen] = useState(false);

  const [movieName, setMovieName] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const submitModal = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/create`, {
      method: "POST",
      body: JSON.stringify({
        name: movieName,
      }),

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    setIsOpen(false);
    setMovieName("");
  };
  return (
    <div>
      <button onClick={openModal}>Add movie</button>
      {isOpen && (
        <div
          style={{
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            alignContent: "center",
          }}
        >
          <div
            style={{
              height: 500,
              width: 800,
              backgroundColor: "white",
              borderRadius: 16,
              margin: "auto",
              padding: 48,
            }}
          >
            <button onClick={closeModal}>Close</button>
            <input
              style={{
                width: 256,
                height: 56,
                border: "1px solid black",
                padding: 4,
              }}
              placeholder="Write a movie"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
            ></input>
            <button onClick={submitModal}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}
