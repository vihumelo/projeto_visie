import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PersonItem.css";

interface Person {
  nome: string;
  data_admissao: string;
  rg: string;
  cpf: string;
  data_nascimento: string;
  funcao: string | null;
}

const initialPerson: Person = {
  nome: "",
  data_admissao: "",
  rg: "",
  cpf: "",
  data_nascimento: "",
  funcao: null,
};

const PersonAdd: React.FC = () => {
  const navigate = useNavigate();
  const [newPerson, setNewPerson] = useState<Person>(initialPerson);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (
      !newPerson.nome ||
      !newPerson.data_admissao ||
      !newPerson.rg ||
      !newPerson.cpf ||
      !newPerson.data_nascimento
    ) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/cadastro", {
        nome: newPerson.nome,
        data_admissao: newPerson.data_admissao,
        rg: newPerson.rg,
        cpf: newPerson.cpf,
        data_nascimento: newPerson.data_nascimento,
        funcao: newPerson.funcao,
      });
      navigate("/");
    } catch (error) {
      console.error("Erro ao adicionar pessoa:", error);
      window.alert("Erro ao adicionar pessoa");
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewPerson((prevPerson) => ({
      ...(prevPerson as Person),
      [name]: value,
    }));
  };

  return (
    <div className="person-item-container">
      <h1>Novo Registro</h1>

      {error && <div className="error-message">{error}</div>}

      <div>
        <label className="label">Nome:</label>
        <textarea
          className="textbox"
          name="nome"
          value={newPerson.nome}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="label">Data de Admissão:</label>
        <input
          className="textbox"
          type="date"
          name="data_admissao"
          value={newPerson.data_admissao}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="label">RG:</label>
        <textarea
          className="textbox"
          name="rg"
          value={newPerson.rg}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="label">CPF:</label>
        <textarea
          className="textbox"
          name="cpf"
          value={newPerson.cpf}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="label">Data de Nascimento:</label>
        <input
          type="date"
          className="textbox"
          name="data_nascimento"
          value={newPerson.data_nascimento}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="label">Função:</label>
        <textarea
          className="textbox"
          name="funcao"
          value={newPerson.funcao || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="button-container">
        <button className="save-button" onClick={handleSave}>
          Adicionar
        </button>
        <button className="back-button-container">
          <Link to="/">Cancelar</Link>
        </button>
      </div>
    </div>
  );
};

export default PersonAdd;
