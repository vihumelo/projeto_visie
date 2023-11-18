import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
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

const PersonItem: React.FC = () => {
  const navigate = useNavigate();
  const { pessoa_id } = useParams<{ pessoa_id: string }>();
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/pessoas/${pessoa_id}`
        );
        setPerson(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados da pessoa:", error);
        window.alert("Erro ao buscar dados da pessoa");
      }
    };

    fetchData();
  }, [pessoa_id]);

  const handleEdit = (id: number) => {
    navigate(`/person/${id}/edit`);
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  if (!person) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="person-item-container">
      <h1>{person.nome}</h1>

      <div>
        <label className="label">Data de Admissão:</label>
        <textarea
          className="textbox"
          value={formatDate(person.data_admissao)}
          readOnly
        />
      </div>
      <div>
        <label className="label">RG:</label>
        <textarea className="textbox" value={person.rg} readOnly />
      </div>
      <div>
        <label className="label">CPF:</label>
        <textarea className="textbox" value={person.cpf} readOnly />
      </div>
      <div>
        <label className="label">Data de Nascimento:</label>
        <textarea
          className="textbox"
          value={formatDate(person.data_nascimento)}
          readOnly
        />
      </div>
      <div>
        <label className="label">Função:</label>
        <textarea
          className="textbox"
          value={person.funcao || "Não informada"}
          readOnly
        />
      </div>
      <div className="button-container">
        <EditButton onClick={() => handleEdit(person.id_pessoa)} />
        <DeleteButton
          itemId={person.id_pessoa}
          onSuccess={() => navigate("/")}
        />
        <button className="back-button-container">
          <Link to="/">Voltar</Link>
        </button>
      </div>
    </div>
  );
};

export default PersonItem;
