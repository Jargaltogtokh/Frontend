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
    <>
      <button onClick={openModal}>Add movie</button>
      {isOpen && (
        <div
          style={{
            height: "100vh",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              margin: "10px",
            }}
          >
            <h2>Add a new movie</h2>
            <input
              type="text"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              placeholder="Enter movie name"
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={closeModal}>Close</button>
              <button onClick={submitModal}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
