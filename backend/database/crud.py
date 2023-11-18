from sqlalchemy.orm import Session
from database import models, schemas

def get_employee_by_cpf(db: Session, cpf_id: str):
    return db.query(models.Employees).filter(models.Employees.cpf == cpf_id).first()

def get_employee_by_id(db: Session, id: int):
    return db.query(models.Employees).filter(models.Employees.id_pessoa == id).first()

def get_employees(db: Session, skip: int = 0, limit: int = 100):

    return db.query(models.Employees).offset(skip).limit(limit).all()

def delete_employee(db: Session, id: int):
    pessoa = db.query(models.Employees).filter(models.Employees.id_pessoa == id).first()
    if pessoa:
        db.delete(pessoa)
        db.commit()
    return pessoa

def create_employee(db: Session, employee: schemas.PersonCreate):

    db_user = models.Employees(
        nome=employee.nome,
        rg=employee.rg,
        cpf=employee.cpf,
        data_nascimento=employee.data_nascimento,
        data_admissao=employee.data_admissao,
        funcao=employee.funcao)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_employee(db: Session, pessoa_id: int, pessoa: schemas.PersonCreate):
    db_user = get_employee_by_id(db, pessoa_id)
    if not db_user:
        return

    db_user.nome = pessoa.nome    
    db_user.rg = pessoa.rg
    db_user.cpf = pessoa.cpf
    db_user.data_nascimento = pessoa.data_nascimento
    db_user.data_admissao = pessoa.data_admissao
    db_user.funcao = pessoa.funcao

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user