import React, { useState } from "react";
import axios from "axios";

interface DeleteButtonProps {
  itemId: number;
  onSuccess: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ itemId, onSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await axios.delete(`http://127.0.0.1:8000/pessoas/${itemId}`);

      onSuccess();
    } catch (error) {
      console.error("Erro ao excluir:", error);
      window.alert("Erro ao excluir");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      className="delete-button"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? "Excluindo..." : "Excluir"}
    </button>
  );
};

export default DeleteButton;
