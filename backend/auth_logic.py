from .models import User
from .database import SessionLocal
from sqlalchemy.exc import IntegrityError
import hashlib
import random
from .database import SessionLocal
from .models import User
from email_utils import send_reset_code
from sqlalchemy.orm import Session
import hashlib

# Авторизация и регистрация
def register_user(data): ...
def login_user(email, password): ...


def hash_password(p):
    return hashlib.sha256(p.encode()).hexdigest()

def register_user(data: dict):
    db = SessionLocal()
    user = User(
        name=data["name"],
        surname=data["surname"],
        email=data["email"],
        password=hash_password(data["password"])
    )
    db.add(user)
    try:
        db.commit()
        return True
    except IntegrityError:
        db.rollback()
        return False
    finally:
        db.close()

def login_user(email, password):
    db = SessionLocal()
    user = db.query(User).filter(User.email == email).first()
    db.close()
    if user and user.password == hash_password(password):
        return user
    return None


# Восстановление пароля
reset_codes = {}  # email: code

def request_password_reset(email: str) -> bool:
    db: Session = SessionLocal()
    user = db.query(User).filter(User.email == email).first()
    db.close()
    if not user:
        return False
    code = str(random.randint(100000, 999999))
    reset_codes[email] = code
    send_reset_code(email, code)
    return True

def confirm_reset_code(email: str, code: str, new_password: str) -> bool:
    if reset_codes.get(email) != code:
        return False

    db: Session = SessionLocal()
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return False

    user.password = hashlib.sha256(new_password.encode()).hexdigest()
    db.commit()
    db.close()
    del reset_codes[email]
    return True