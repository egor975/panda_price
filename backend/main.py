from fastapi import FastAPI, Query, Request, Form
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import Request
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import os
from backend.parser_ozon import parse_ozon
from backend.parser_wildberries import parse_wildberries
from backend.parser_yandex import parse_yandex_market
from fastapi.responses import JSONResponse
from backend.auth_logic import register_user, login_user, request_password_reset, confirm_reset_code



app = FastAPI()

@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


# Подключение статики и шаблоны
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app.mount("/static", StaticFiles(directory="../frontend/static"), name="static")
templates = Jinja2Templates(directory="../frontend/templates")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Подключение фронтенда
    allow_methods=["*"],
    allow_headers=["*"],
)


# Поисковик
@app.get("/api/search")
async def search_products(
    query: str = Query(...),
    marketplaces: list[str] = Query([]),
    categories: list[str] = Query([]),
):
    results = []

    if "ozon" in marketplaces:
        results.extend(parse_ozon(query, categories))
    if "wildberries" in marketplaces:
        results.extend(parse_wildberries(query, categories))
    if "yandex" in marketplaces:
        results.extend(parse_yandex_market(query, categories))

    return JSONResponse(content={"results": results})


# База Данных для регистрации и авторизации
@app.post("/api/login")
def login(email: str, password: str):
    # Проверка в базе и возвращение токена
    ...

@app.post("/api/register")
def register(name: str, surname: str, email: str, password: str):
    # Добавление пользователя в БД
    ...

@app.post("/api/register")
def register(
    name: str = Form(...),
    surname: str = Form(...),
    email: str = Form(...),
    password: str = Form(...)
):
    success = register_user({
        "name": name,
        "surname": surname,
        "email": email,
        "password": password
    })
    return {"ok": success}

@app.post("/api/login")
def login(email: str = Form(...), password: str = Form(...)):
    user = login_user(email, password)
    return {"ok": bool(user)}


# Восстановление пароля
@app.post("/api/request-reset")
def send_code(email: str = Form(...)):
    ok = request_password_reset(email)
    return {"ok": ok}

@app.post("/api/confirm-reset")
def reset_password(email: str = Form(...), code: str = Form(...), new_password: str = Form(...)):
    ok = confirm_reset_code(email, code, new_password)
    return {"ok": ok}