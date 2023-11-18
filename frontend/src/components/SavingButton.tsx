import React, { useState } from "react";

interface SavingButtonProps {
  onSave: () => Promise<void>;
}

const SavingButton: React.FC<SavingButtonProps> = ({ onSave }) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      window.alert(`Erro ao salvar`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button className="save-button" onClick={handleSave} disabled={isSaving}>
      {isSaving ? "Salvando..." : "Salvar"}
    </button>
  );
};

export default SavingButton;
