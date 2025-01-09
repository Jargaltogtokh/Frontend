"use client";

import { useState } from "react";

type EditButtonProps = {
  movie: { id: number; name: string };
};

export default function EditButton({ movie }: EditButtonProps) {
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    const change = prompt("Edit the movie name:", movie.name);

    if (change != null) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/${movie.id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              name: change,
            }),

            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          setMessage(`Successfully updated the movie name to "${change}"`);
        } else {
          setMessage("Failed to update the movie name.");
        }
      } catch (error) {
        // Handle network or other unexpected errors
        setMessage("An error occurred while updating the movie name.");
        console.error(error);
      }
    } else {
      setMessage("No changes made.");
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Edit</button>
      {message && <p>{message}</p>}
    </div>
  );
}
