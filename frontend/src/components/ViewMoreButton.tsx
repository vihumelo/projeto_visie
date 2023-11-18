import React from "react";

interface ViewMoreButtonProps {
  onClick: () => void;
}

const ViewMoreButton: React.FC<ViewMoreButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Ver Mais</button>;
};

export default ViewMoreButton;
