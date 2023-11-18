from pydantic import BaseModel
from datetime import date
from typing import Optional

class PersonBase(BaseModel):
    nome: str
    data_admissao: date

class Person(PersonBase):
    id_pessoa: int
    rg: str
    cpf: str
    data_nascimento: date
    funcao: Optional[str]
    

class PersonCreate(PersonBase):
    rg: str
    cpf: str
    data_nascimento: date
    funcao: Optional[str]
    
