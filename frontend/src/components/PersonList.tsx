import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import ViewMoreButton from "./ViewMoreButton";
import AddButton from "./AddButton";
import "./PersonList.css";

interface Person {
  nome: string;
  data_admissao: string;
  id_pessoa: number;
  rg: string;
  cpf: string;
  data_nascimento: string;
  funcao: string | null;
}

const PersonList: React.FC = () => {
  const navigate = useNavigate();
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/pessoas");
        setPersons(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        window.alert("Erro ao buscar dados");
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/person/${id}/edit`);
  };

  const handleViewMore = (id: number) => {
    navigate(`/person/${id}`);
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <h1>Lista de Pessoas</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data de Admissão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.id_pessoa}>
              <td>{person.nome.split(" ")[0]}</td>
              <td>{formatDate(person.data_admissao)}</td>
              <td>
                <EditButton onClick={() => handleEdit(person.id_pessoa)} />
                <DeleteButton
                  itemId={person.id_pessoa}
                  onSuccess={() =>
                    setPersons((prevPersons) =>
                      prevPersons.filter(
                        (p) => p.id_pessoa !== person.id_pessoa
                      )
                    )
                  }
                />
                <Link to={`/person/${person.id_pessoa}`}>
                  <ViewMoreButton
                    onClick={() => handleViewMore(person.id_pessoa)}
                  />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddButton />
    </div>
  );
};

export default PersonList;
