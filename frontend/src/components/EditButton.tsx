import React from "react";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Editar</button>;
};

export default EditButton;
