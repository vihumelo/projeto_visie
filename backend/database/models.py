from sqlalchemy import Column, Integer, String, Date
from database import Base


class Employees(Base):
    __tablename__ = 'pessoas'
    id_pessoa = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100))
    rg = Column(String(100))
    cpf = Column(String(100))
    data_nascimento = Column(Date)
    data_admissao = Column(Date)
    funcao = Column(String(100), nullable=True)
    