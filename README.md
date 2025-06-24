# 📅 Demo Fullstack de Google Calendar

Una aplicación fullstack de ejemplo usando FastAPI (Python) para el backend y Vite + React (TypeScript) para el frontend. Este proyecto demuestra autenticación OAuth2 de Google Calendar y la creación de eventos.

---

## 🗂️ Estructura del Proyecto

```
backend/   # FastAPI + Poetry + Google OAuth2
frontend/  # Vite + React + TypeScript
```

---

## 🚀 Inicio Rápido

### 1. Clona el repositorio

```bash
git clone git@github.com:rtelenta/gcal-fullstack-demo.git
cd gcal-fullstack-demo
```

### 2. Configura las credenciales de Google OAuth2

1. Ve a la [Consola de Google Cloud](https://console.cloud.google.com/apis/credentials)
2. Crea un nuevo ID de cliente OAuth 2.0 (tipo: Aplicación web)
3. Establece el URI de redirección en: `http://localhost:8000/api/auth/callback`
4. Descarga o copia tus credenciales.
5. Copia el archivo `.env.example` como `.env` en la carpeta `backend/`:

```bash
cp backend/.env.example backend/.env
```

6. Copia el archivo `.env.example` como `.env` en la carpeta `frontend/`:

```bash
cp frontend/.env.example frontend/.env
```

7. Completa los valores en ambos archivos `.env` según corresponda.
   - El archivo `.env` del frontend puede quedarse igual que `.env.example` salvo que el backend esté funcionando en otro puerto o URL.

---

## 🐍 Backend (FastAPI + Poetry)

### Instalar dependencias

```bash
cd backend
poetry install
```

### Ejecutar el servidor backend

```bash
poetry run poe dev
```

El backend estará disponible en [http://localhost:8000/docs](http://localhost:8000/docs)

---

## ⚛️ Frontend (Vite + React)

### Instalar dependencias

```bash
cd frontend
bun install
```

### Ejecutar el servidor de desarrollo del frontend

```bash
bun run dev
```

El frontend estará disponible en [http://localhost:5173](http://localhost:5173)

---

## 🌐 Uso

- Visita el frontend en tu navegador.
- Haz clic en el botón de login para autenticarte con Google.
- Agrega un evento al calendario usando el formulario de ejemplo.

---

## 📝 Notas

- Asegúrate de que tanto el backend como el frontend estén en ejecución para la funcionalidad completa.
- El backend usa `/api` como prefijo para todos los endpoints.

---

## 📦 Stack Tecnológico

- **Backend:** FastAPI, Poetry, Python, Google OAuth2
- **Frontend:** React, Vite, TypeScript, Bun

---

## 📄 Licencia

MIT
