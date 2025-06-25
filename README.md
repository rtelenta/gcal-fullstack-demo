# 📅 Demo Fullstack de Google Calendar

Una aplicación fullstack de ejemplo usando FastAPI (Python) para el backend y Vite + React (TypeScript) para el frontend. Este proyecto demuestra autenticación OAuth2 de Google Calendar y la creación de eventos.

---

## 🗂️ Estructura del Proyecto

```
backend/   # FastAPI + Poetry + Google OAuth2
frontend/  # Vite + React + TypeScript
mobile/    # Expo + React Native
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

7. Copia el archivo `.env.example` como `.env` en la carpeta `mobile/`:

```bash
cp mobile/.env.example mobile/.env
```

8. Completa los valores en los archivos `.env` según corresponda.
   - El archivo `.env` del frontend puede quedarse igual que `.env.example` salvo que el backend esté funcionando en otro puerto o URL.
   - El archivo `.env` de mobile debe contener, por ejemplo:

```
API_URL=http://localhost:8000/api
MOBILE_DEEPLINK_SCHEME=mobile://auth
```

- Para probar el login de Google desde la app mobile, el backend debe estar disponible en una URL pública accesible desde el dispositivo móvil. Puedes usar [ngrok](https://ngrok.com/) para exponer tu backend local:

```bash
ngrok http 8000
```

Luego, usa la URL pública de ngrok (por ejemplo, `https://xxxx.ngrok.io/api`) en la variable `API_URL` de tu `.env` de mobile y como redirect URI en Google Cloud Console.

- Ajusta estos valores según tu entorno de desarrollo o despliegue.

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
bun dev
```

El frontend estará disponible en [http://localhost:5173](http://localhost:5173)

---

## 📱 Mobile (Expo + React Native)

### Instalar dependencias

```bash
cd mobile
bun install
```

### Ejecutar la app móvil en modo desarrollo

```bash
bun dev
```

Esto abrirá Expo Go, donde podrás escanear el QR con tu dispositivo o correr en un emulador.

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
- **Mobile:** Expo, React Native

---

## 📄 Licencia

MIT
