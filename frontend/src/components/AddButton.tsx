import React from "react";
import { useNavigate } from "react-router-dom";
import "./AddButton.css";

const AddButton: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/person/add");
  };

  return (
    <div className="add-button-container">
      <button className="add-button" onClick={handleButtonClick}>
        Adicionar novo registro
      </button>
    </div>
  );
};

export default AddButton;
