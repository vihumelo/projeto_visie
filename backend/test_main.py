from http import HTTPStatus
from unittest import mock
from fastapi.testclient import TestClient
from main import app, get_db

def overrides_get_db():...

app.dependency_overrides[get_db] = overrides_get_db
client = TestClient(app)

data = { 
"nome": "string",
"data_admissao": "2023-11-17",
"id_pessoa": 0,
"rg": "string",
"cpf": "string",
"data_nascimento": "2023-11-17",
"funcao": "string" }


@mock.patch("database.crud.get_employees")
def test_get_persons(get_employees):
       
    get_employees.return_value = [data]
    response = client.get("/pessoas")
    assert response.status_code == HTTPStatus.OK
    assert response.json() == [data]
    
@mock.patch("database.crud.get_employee_by_cpf")
@mock.patch("database.crud.create_employee")
def test_post_add(create_employee, get_employee_by_cpf):
    
    create_employee.return_value = data
    get_employee_by_cpf.return_value = None
    
    response = client.post("/cadastro", json={
                "nome": "string",
                "data_admissao": "2023-11-17",
                "rg": "123",
                "cpf": "123",
                "data_nascimento": "2023-11-17",
                "funcao": "string"
    })
    
    assert response.status_code == HTTPStatus.OK
    assert response.json() == data
    
def test_invalid_person_add():
    response = client.post("/cadastro", json={})
    assert response.status_code == HTTPStatus.UNPROCESSABLE_ENTITY

@mock.patch("database.crud.get_employee_by_cpf")
def test_person_exists(get_employee_by_cpf):
    
    get_employee_by_cpf.return_value = data
    response = client.post("/cadastro", json={
                "nome": "string",
                "data_admissao": "2023-11-17",
                "rg": "string",
                "cpf": "string",
                "data_nascimento": "2023-11-17",
                "funcao": "string"
    })
    
    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json() == {'detail': 'Esta pessoa já está cadastrada'}

@mock.patch("database.crud.get_employee_by_id")
def test_get_person(get_employee_by_id):
    get_employee_by_id.return_value = data
    response = client.get('/pessoas/1')
    assert response.status_code == HTTPStatus.OK
    assert response.json() == data
    
@mock.patch("database.crud.get_employee_by_id")
def test_person_not_found(get_employee_by_id):
    get_employee_by_id.return_value = None
    response = client.get('/pessoas/123123')
    
    assert response.status_code == HTTPStatus.NOT_FOUND
    
@mock.patch("database.crud.delete_employee")
def test_delete_person(delete_employee):
    delete_employee.return_value = data
    response = client.delete('/pessoas/1')

    assert response.json() == {"status": "Pessoa deletada com sucesso"}

@mock.patch("database.crud.delete_employee")
def test_delete_person_error(delete_employee):
    delete_employee.return_value = None
    response = client.delete('/pessoas/1212312')

    assert response.status_code == HTTPStatus.NOT_FOUND
    
@mock.patch("database.crud.update_employee")
def test_update_person(update_employee):
    update_employee.return_value = data
    response = client.put('/pessoas/1', json={
                            "nome": "string",
                            "data_admissao": "2023-11-20",
                            "rg": "string",
                            "cpf": "string",
                            "data_nascimento": "2023-11-17",
                            "funcao": "string"
                            }
                          )

    assert response.status_code == HTTPStatus.OK
    assert response.json() == data
    
@mock.patch("database.crud.update_employee")
def test_update_person_error(update_employee):
    update_employee.return_value = None
    response = client.put('/pessoas/1212312', json={
                            "nome": "string",
                            "data_admissao": "2023-11-20",
                            "rg": "string",
                            "cpf": "string",
                            "data_nascimento": "2023-11-17",
                            "funcao": "string"
                            }
                          )

    assert response.status_code == HTTPStatus.NOT_FOUND
    
def test_invalid_person_update():
    response = client.put("/pessoas/1", json={})
    assert response.status_code == HTTPStatus.UNPROCESSABLE_ENTITY