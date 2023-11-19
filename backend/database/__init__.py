from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

LOGIN = "victormelo"
SENHA = '****' # SENHA de acesso ao banco de dados

SQLALCHEMY_DATABASE_URL = f"mysql+mysqlconnector://{LOGIN}:{SENHA}@jobs.visie.com.br:3306/victormelo"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
 

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
