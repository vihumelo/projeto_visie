import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SavingButton from "./SavingButton";
import "./PersonItem.css";

interface Person {
  id_pessoa: number;
  nome: string;
  data_admissao: string;
  rg: string;
  cpf: string;
  data_nascimento: string;
  funcao: string | null;
}

const PersonEdit: React.FC = () => {
  const navigate = useNavigate();
  const { pessoa_id } = useParams<{ pessoa_id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [editedPerson, setEditedPerson] = useState<Person | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/pessoas/${pessoa_id}`
        );
        setPerson(response.data);
        setEditedPerson(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados da pessoa:", error);
        window.alert("Erro ao buscar dados da pessoa");
      }
    };

    fetchData();
  }, [pessoa_id]);

  const handleSave = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/pessoas/${pessoa_id}`,
        editedPerson
      );

      navigate("/");
    } catch (error) {
      console.error(
        `Erro ao salvar alterações para pessoa com ID ${pessoa_id}:`,
        error
      );
      window.alert("Erro ao salvar alterações");
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEditedPerson((prevPerson) => ({
      ...(prevPerson as Person),
      [name]: value,
    }));
  };

  if (!person) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="person-item-container">
      <h1>{person.nome}</h1>

      <div>
        <label className="label">Nome:</label>
        <input
          type="text"
          className="textbox"
          name="nome"
          value={editedPerson?.nome || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="label">Data de Admissão:</label>
        <input
          type="date"
          className="textbox"
          name="data_admissao"
          value={editedPerson?.data_admissao || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="label">RG:</label>
        <textarea
          className="textbox"
          name="rg"
          value={editedPerson?.rg || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="label">CPF:</label>
        <textarea
          className="textbox"
          name="cpf"
          value={editedPerson?.cpf || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="label">Data de Nascimento:</label>
        <input
          type="date"
          className="textbox"
          name="data_nascimento"
          value={editedPerson?.data_nascimento || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="label">Função:</label>
        <textarea
          className="textbox"
          name="funcao"
          value={editedPerson?.funcao || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="button-container">
        <SavingButton onSave={handleSave} />

        <button className="back-button-container">
          <Link to="/">Cancelar</Link>
        </button>
      </div>
    </div>
  );
};

export default PersonEdit;
