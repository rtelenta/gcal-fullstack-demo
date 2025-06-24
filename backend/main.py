import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from urllib.parse import urlencode
from pydantic import BaseModel
import requests
from fastapi import APIRouter
from fastapi.responses import HTMLResponse

load_dotenv()
app = FastAPI()
CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = "http://localhost:8000/api/auth/callback"
TOKENS = {}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter()


class Event(BaseModel):
    summary: str
    description: str
    start: str
    end: str
    timezone: str


@router.get("/auth/url")
def get_auth_url():
    params = {
        "client_id": CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "response_type": "code",
        "scope": "https://www.googleapis.com/auth/calendar.events",
        "access_type": "offline",
        "prompt": "consent",
    }
    return {
        "auth_url": f"https://accounts.google.com/o/oauth2/v2/auth?{urlencode(params)}"
    }


@router.get("/auth/callback")
def auth_callback(code: str):
    data = {
        "code": code,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "redirect_uri": REDIRECT_URI,
        "grant_type": "authorization_code",
    }
    r = requests.post("https://oauth2.googleapis.com/token", data=data)
    if r.status_code != 200:
        raise HTTPException(status_code=400, detail="Token exchange failed")
    TOKENS["access_token"] = r.json()["access_token"]

    html = """
    <html>
      <body>
        <script>
          window.opener.postMessage({ status: "authorized" }, "*");
          window.close();
        </script>
        <p>Autenticado correctamente. Puedes cerrar esta ventana.</p>
      </body>
    </html>
    """

    return HTMLResponse(content=html)


@router.post("/add-event")
def add_event(event: Event):
    token = TOKENS.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authorized")

    event_payload = {
        "summary": event.summary,
        "description": event.description,
        "start": {"dateTime": event.start, "timeZone": event.timezone},
        "end": {"dateTime": event.end, "timeZone": event.timezone},
    }

    r = requests.post(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        json=event_payload,
    )

    if r.status_code not in (200, 201):
        raise HTTPException(status_code=400, detail="Failed to create event")

    return r.json()


app.include_router(router, prefix="/api")
