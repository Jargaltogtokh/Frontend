import { useState } from "react";

type DeleteButtonProps = {
  movie: { id: number; name: string };
};

export default function DeleteButton({ movie }: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/${movie.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setMessage(`Movie "${movie.name}" deleted successfully`);
        setIsOpen(false);
      }
    } catch (error) {
      setMessage("Error occurred");
    }
  };

  return (
    <div>
      <button onClick={openModal}> Delete</button>
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
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={closeModal}>Close</button>
              <button onClick={confirmDelete}>Delete</button>
            </div>
            {message && <p style={{ marginTop: "10px" }}>{message} </p>}
          </div>
        </div>
      )}
    </div>
  );
}
