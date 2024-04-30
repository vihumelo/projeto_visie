Este é o repositório do meu projeto backend e frontend, onde utilizei algumas tecnologias essenciais.

## Tecnologias Utilizadas

### Backend

- **SQLAlchemy:** Utilizado para interação com o banco de dados.
- **Pydantic:** Usado para validação e estruturação de dados.
- **Alembic:** Gerencia migrações de banco de dados.
- **MySQL:** Banco de dados relacional.
- **FastAPI:** Framework para construir APIs com Python.

### Frontend

- **React & TypeScript:** Utilizado para a construção da interface do usuário.
- **Vite:** Build tool para desenvolvimento rápido e eficiente.

## Testes Automatizados

- **pytest:** A biblioteca pytest foi utilizada para implementar testes automatizados no arquivo `test_main.py`. Execute os testes com o seguinte comando:

    ```bash
    cd backend
    pytest test_main.py
    ```
## Como Executar o Projeto
1. **Clone o repositório:**
    ```bash
    git clone https://github.com/vihumelo/projeto_visie.git
    ```
2. **Instale as dependências do backend:**
    ```bash
    cd backend
    pip install -r requirements.txt
    ```
3. **Execute o backend:**
    ```bash
    uvicorn main:app --reload
    ```
4. **Instale as dependências do frontend:**
    ```bash
    cd frontend
    npm install
    ```
5. **Execute o frontend:**
    ```bash
    npm run dev
    ```
