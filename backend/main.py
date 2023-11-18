from sqlalchemy.orm import Session
from database import get_db, crud, schemas
from fastapi import Depends, FastAPI, HTTPException
from http import HTTPStatus
from typing import List
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:5173", #frontend host
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],  
)



@app.get("/pessoas", response_model=List[schemas.Person])
def read_pessoas(skip: int = 0, limit:int = 100, db: Session = Depends(get_db)):
    items = crud.get_employees(db, skip, limit)
    
    return items

@app.get("/pessoas/{pessoa_id}", response_model=schemas.Person)
def read_user(pessoa_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_employee_by_id(db, pessoa_id)
    if not db_user:
        raise HTTPException(HTTPStatus.NOT_FOUND, "Pessoa não encontrada")

    return db_user

@app.post("/cadastro/", response_model=schemas.Person)
def create_employee(employee: schemas.PersonCreate, db: Session = Depends(get_db)):
    db_user = crud.get_employee_by_cpf(db, cpf_id=employee.cpf)
    if db_user:
        raise HTTPException(HTTPStatus.BAD_REQUEST, detail="Esta pessoa já está cadastrada")
    
    return crud.create_employee(db=db, employee=employee)

@app.delete("/pessoas/{pessoa_id}")
def delete_employee(pessoa_id: int, db: Session = Depends(get_db)):
    pessoa = crud.delete_employee(db, pessoa_id)
    if not pessoa:
        raise HTTPException(HTTPStatus.NOT_FOUND, detail="Pessoa não encontrada")
    
    return {"status": "Pessoa deletada com sucesso"}

@app.put("/pessoas/{pessoa_id}", response_model=schemas.Person)
def update_employee(pessoa_id: int, pessoa: schemas.PersonCreate, db: Session = Depends(get_db)):
    db_user = crud.update_employee(db, pessoa_id, pessoa)
    if not db_user:
        raise HTTPException(HTTPStatus.NOT_FOUND, "Pessoa não encontrada")
    
    return db_user